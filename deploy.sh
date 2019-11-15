#!/bin/bash
set -e
NAME=$(cat package.json|grep name|head -1|awk -F: '{ print $2 }'|sed 's/[\",]//g'|tr -d '[[:space:]]') 
NEXUS="nexus-0.dev.openshift.multivaloresgf.local:18444"
echo "Building: $NAME"
docker build -t $NAME .

docker tag $NAME $NEXUS/codi/$NAME:dev
docker push $NEXUS/codi/$NAME:dev

oc project codi
oc delete all --selector app=$NAME || true
oc import-image $NEXUS/codi/$NAME:dev --confirm
oc apply -f deploy/dc.dev.yaml
oc expose dc/$NAME