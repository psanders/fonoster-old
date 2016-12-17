#!/usr/bin/env bash

#!/usr/bin/env bash

timestamp() {
  date +"%Y%m%d%H%M"
}

mvn package

# Building the docs with slate
cd docs/
docker build -t slate .
docker run -it slate
cd ..

docker build -t gcr.io/fonoster-app/fnsite:latest .
docker build -t gcr.io/fonoster-app/fnsite:1.0.$(timestamp) .