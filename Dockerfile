FROM gcr.io/fonoster-app/fnjetty:latest
MAINTAINER Pedro Sanders <fonosterteam@fonoster.com>

ADD target/site.war             /opt/app-base/webapps
ADD src/main/resources/site.xml /opt/app-base/webapps
ADD docs/build/                 /opt/app-base/webapps/docs
