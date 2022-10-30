#!/bin/bash
set -e

npm install
npm run clean
npm run lint
npm run build

# GCP
# gsutil web set -m index.html -e error.html gs://www.leonyu.net/
gsutil -m -h "Cache-Control: no-cache, max-age=0" rsync -r ./dist/ gs://www.leonyu.net/

# AWS
# aws s3 cp --acl public-read --recursive ./dist s3://www.leonyu.net/
