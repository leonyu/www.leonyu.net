#!/bin/bash
set -e

yarn
yarn clean
yarn lint
yarn build
aws s3 cp --acl public-read --recursive ./dist s3://www.leonyu.net/
