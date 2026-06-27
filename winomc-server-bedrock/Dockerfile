ARG BUILD_VERSION
FROM ubuntu:22.04

ARG TARGETARCH

ENV DEBIAN_FRONTEND=noninteractive \
    BOX64_NOBANNER=1

COPY rootfs/ /

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        gcc \
        gnupg \
        jq \
        libc6-dev \
        libcurl4 \
        libssl3 \
        python3 \
        tzdata \
        unzip \
    && if [ "${TARGETARCH:-amd64}" = "arm64" ]; then \
        echo "Installing Box64 for WinoMC ARM64 support"; \
        curl -fsSL "https://ryanfortner.github.io/box64-debs/KEY.gpg" \
          | gpg --dearmor \
          > /etc/apt/trusted.gpg.d/box64-debs-archive-keyring.gpg; \
        curl -fsSL "https://ryanfortner.github.io/box64-debs/box64.list" \
          -o /etc/apt/sources.list.d/box64.list; \
        apt-get update; \
        apt-get install -y --no-install-recommends box64 libjemalloc2; \
      fi \
    && gcc -shared -fPIC -O2 -Wall -Wextra \
        -o /opt/winomc-bds-ipv6fix.so \
        /usr/local/src/winomc-bds-ipv6fix.c \
        -ldl \
    && chmod 0644 /opt/winomc-bds-ipv6fix.so \
    && rm -rf /var/lib/apt/lists/* \
    && chmod +x \
        /usr/local/bin/winomc-bedrock-entrypoint \
        /usr/local/bin/winomc-console-server \
        /usr/local/bin/winomc-native-start \
        /usr/local/bin/winomc-native-content-import \
        /usr/local/bin/winomc-native-content-import-one \
        /usr/local/bin/winomc-write-server-properties

WORKDIR /config

ENTRYPOINT ["/usr/local/bin/winomc-bedrock-entrypoint"]

ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_DESCRIPTION
ARG BUILD_NAME
ARG BUILD_REF
ARG BUILD_REPOSITORY
ARG BUILD_VERSION

LABEL \
    io.hass.name="${BUILD_NAME}" \
    io.hass.description="${BUILD_DESCRIPTION}" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="kasawino (https://github.com/kasawino69)" \
    org.opencontainers.image.title="${BUILD_NAME}" \
    org.opencontainers.image.description="${BUILD_DESCRIPTION}" \
    org.opencontainers.image.vendor="Home Assistant Add-ons" \
    org.opencontainers.image.authors="kasawino (https://github.com/kasawino69)" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.url="https://github.com/kasawino69" \
    org.opencontainers.image.source="https://github.com/${BUILD_REPOSITORY}" \
    org.opencontainers.image.documentation="https://github.com/${BUILD_REPOSITORY}/blob/main/README.md" \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.revision=${BUILD_REF} \
    org.opencontainers.image.version=${BUILD_VERSION}