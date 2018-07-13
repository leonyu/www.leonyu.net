#!/bin/bash
yarn install && yarn clean && yarn lint && yarn build && aws s3 cp --acl public-read --recursive ./public s3://www.leonyu.net && aws s3 cp --acl public-read --recursive ./dist s3://www.leonyu.net/js
