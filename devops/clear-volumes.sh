#!/bin/sh

set -x;
echo $USER

docker volume rm $(docker volume ls -q)