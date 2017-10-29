#!/bin/bash
aws s3 cp --recursive . s3://www.leonyu.net --exclude '.*' --exclude 'node_modules' --exclude '*.sh' --acl public-read

