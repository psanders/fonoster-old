#!/usr/bin/env bash

#!/usr/bin/env bash

timestamp() {
  date +"%Y%m%d%H%M"
}

mvn package

docker build -t gcr.io/fonoster-app/fnsite:latest .
docker build -t gcr.io/fonoster-app/fnsite:1.0.$(timestamp) .