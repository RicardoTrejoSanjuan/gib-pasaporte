#!/bin/bash
set -e
NAME=$(cat package.json|grep name|head -1|awk -F: '{ print $2 }'|sed 's/[\",]//g'|tr -d '[[:space:]]') 

echo "Building: $NAME"
docker build -t $NAME .

docker tag $NAME nexus-0.dev.openshift.multivaloresgf.local:18444/codi/$NAME:dev
docker push nexus-0.dev.openshift.multivaloresgf.local:18444/codi/$NAME:dev

oc project codi
oc delete all --selector app=$NAME
oc apply -f deploy/dc.dev.yaml
oc expose dc/$NAME
