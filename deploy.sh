#!/bin/bash
aws s3 cp --acl public-read --recursive . s3://www.leonyu.net --exclude '.*' --exclude 'node_modules' --exclude '*.sh'

