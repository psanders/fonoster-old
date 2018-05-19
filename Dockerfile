FROM jetty:alpine
MAINTAINER Pedro Sanders <fonosterteam@fonoster.com>

COPY keystore                    $JETTY_BASE/etc/keystore
COPY start.ini                   $JETTY_BASE/start.ini
COPY target/site.war             $JETTY_BASE/webapps
COPY src/main/resources/site.xml $JETTY_BASE/webapps
COPY docs/build/                 $JETTY_BASE/webapps/docs

EXPOSE 8080
EXPOSE 8443