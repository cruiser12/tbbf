#!/bin/bash

echo "FLUSHALL" | redis-cli;
cat HITS.redis | redis-cli --pipe;
cat LIKES.redis | redis-cli --pipe;
cat LIKE_HITS.redis | redis-cli --pipe;

