#!/usr/bin/env bash

DOCKER_NAME=keycloak-idp
docker container rm -f $(docker container ls -a -q -f name=${DOCKER_NAME}) || true
