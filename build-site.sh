#!/usr/bin/env bash

timestamp() {
  date +"%Y%m%d%H%M"
}

# Get last docs from repo
cd docs
git checkout
cd ..
git submodule init
git submodule update

mvn package

# Building the docs with slate
cd docs/
docker build -t slate .
docker run -it -v $(pwd):/app slate
cd ..

docker build -t gcr.io/fonoster-app/fnsite:latest .
docker build -t gcr.io/fonoster-app/fnsite:1.0.$(timestamp) .