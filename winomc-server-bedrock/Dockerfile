ARG BUILD_FROM
ARG BUILD_VERSION
FROM ${BUILD_FROM}

COPY rootfs/ /

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        jq \
        python3 \
        unzip \
    && rm -rf /var/lib/apt/lists/* \
    && chmod +x \
        /usr/local/bin/winomc-bedrock-entrypoint \
        /usr/local/bin/winomc-console-server \
        /usr/local/bin/winomc-native-start \
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
    maintainer="kasawino69 (https://github.com/kasawino69)" \
    org.opencontainers.image.title="${BUILD_NAME}" \
    org.opencontainers.image.description="${BUILD_DESCRIPTION}" \
    org.opencontainers.image.vendor="Home Assistant Add-ons" \
    org.opencontainers.image.authors="kasawino69 (https://github.com/kasawino69)" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.url="https://github.com/kasawino69" \
    org.opencontainers.image.source="https://github.com/${BUILD_REPOSITORY}" \
    org.opencontainers.image.documentation="https://github.com/${BUILD_REPOSITORY}/blob/main/README.md" \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.revision=${BUILD_REF} \
    org.opencontainers.image.version=${BUILD_VERSION}
