#!/bin/bash
aws s3 cp --recursive . s3://www.leonyu.net --exclude '.git*' --exclude '*.sh' --acl public-read

