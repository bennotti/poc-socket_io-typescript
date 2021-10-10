#!/bin/sh

set -x;
echo $USER

if  [ $# -lt 2 ]; then
    echo "Parametros defaults, Sintaxe customizada: sh run.sh projectName debug|dev|tst|hml|prd"
    echo "Parametros defaults, default: sh stop.sh projectName debug"
    projectName="poc"
    ambiente="debug"
else 
    projectName=$1
    ambiente=$2
fi

dockerProjectName=$projectName'_'$ambiente
dockerFileName='docker-comp-'$ambiente'.yml'

echo "#### docker-compose down"
docker-compose -p $dockerProjectName -f ./devops/$dockerFileName down