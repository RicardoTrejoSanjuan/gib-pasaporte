#!/bin/bash

docker build -t codi08 .

docker tag codi08 nexus-0.dev.openshift.multivaloresgf.local:18444/codi/codi08:dev
docker push nexus-0.dev.openshift.multivaloresgf.local:18444/codi/codi08:dev

docker container rm $(docker container ls -q -f 'status=exited' -f 'exited=0' -f 'exited=1')
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")

oc project codi
oc delete all --selector app=codi-08-consultamensajescobrocomprador
oc new-app --name=codi-08-consultamensajescobrocomprador --docker-image=nexus-0.dev.openshift.multivaloresgf.local:18444/codi/codi08:dev
oc volume dc/codi-08-consultamensajescobrocomprador --overwrite --add -t configmap  -m /opt/app-root/routes --name=rutas --configmap-name=rutas
oc env dc/codi-08-consultamensajescobrocomprador --from=configmap/banxico
oc env dc/codi-08-consultamensajescobrocomprador --from=configmap/conexion-postgres
oc env dc/codi-08-consultamensajescobrocomprador --from=configmap/proxy
