#define _GNU_SOURCE

#include <arpa/inet.h>
#include <dlfcn.h>
#include <errno.h>
#include <netinet/in.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>

typedef int (*real_bind_fn)(int sockfd, const struct sockaddr *addr, socklen_t addrlen);

static real_bind_fn real_bind = NULL;

static void init_real_bind(void) {
    if (real_bind == NULL) {
        real_bind = (real_bind_fn)dlsym(RTLD_NEXT, "bind");

        if (real_bind == NULL) {
            fprintf(stderr, "[winomc-bds-ipv6fix] ERROR: failed to resolve real bind(): %s\n", dlerror());
        }
    }
}

static bool is_ipv6_bind(const struct sockaddr *addr, socklen_t addrlen) {
    return addr != NULL &&
           addrlen >= sizeof(struct sockaddr_in6) &&
           addr->sa_family == AF_INET6;
}

int bind(int sockfd, const struct sockaddr *addr, socklen_t addrlen) {
    init_real_bind();

    if (real_bind == NULL) {
        errno = EINVAL;
        return -1;
    }

    if (is_ipv6_bind(addr, addrlen)) {
        int one = 1;
        int rc = setsockopt(sockfd, IPPROTO_IPV6, IPV6_V6ONLY, &one, sizeof(one));

        if (rc == 0) {
            const struct sockaddr_in6 *addr6 = (const struct sockaddr_in6 *)addr;
            unsigned int port = ntohs(addr6->sin6_port);

            fprintf(stderr, "[winomc-bds-ipv6fix] Fixing IPv6: IPV6_V6ONLY=1 set on fd=%d port=%u\n", sockfd, port);
        } else {
            fprintf(stderr, "[winomc-bds-ipv6fix] WARN: failed to set IPV6_V6ONLY on fd=%d: %s\n", sockfd, strerror(errno));
        }
    }

    return real_bind(sockfd, addr, addrlen);
}