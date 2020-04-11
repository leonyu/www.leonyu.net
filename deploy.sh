#!/bin/bash
set -e

yarn install
yarn clean
yarn lint
yarn build

# GCP
# gsutil web set -m index.html -e error.html gs://www.leonyu.net/
gsutil -m rsync -r ./dist/ gs://www.leonyu.net/

# AWS
# aws s3 cp --acl public-read --recursive ./dist s3://www.leonyu.net/
