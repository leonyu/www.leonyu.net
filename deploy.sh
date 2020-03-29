#!/bin/bash
set -e

yarn install
yarn clean
yarn lint
yarn build
gsutil cp -R ./dist gs://www.leonyu.net/
# aws s3 cp --acl public-read --recursive ./dist s3://www.leonyu.net/
