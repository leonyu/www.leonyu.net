#!/bin/bash

pushd $(dirname "$(readlink -f "$0")")
docker-compose -f ./docker-compose.yml pull
docker-compose -f ./docker-compose.yml up -d --remove-orphans
popd
docker system prune -f
