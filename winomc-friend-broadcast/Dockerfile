ARG BUILD_FROM
FROM ${BUILD_FROM}

USER root

RUN apt-get update && \
    apt-get install -y --no-install-recommends jq ca-certificates curl && \
    rm -rf /var/lib/apt/lists/*

COPY rootfs/ /

RUN chmod +x /usr/local/bin/winomc-friend-broadcast

WORKDIR /config

ENTRYPOINT ["/usr/local/bin/winomc-friend-broadcast"]