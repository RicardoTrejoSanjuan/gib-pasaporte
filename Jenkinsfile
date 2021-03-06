pipeline {
      agent any

      parameters {
           string(name: 'openshift', defaultValue: 'https://console.dev.openshift.multivaloresgf.local:8443', description: '')
           string(name: 'openshiftProject', defaultValue: 'biometricos', description: '')
           string(name: 'npmRegistry', defaultValue: 'http://nexus-0.dev.openshift.multivaloresgf.local:8081/repository/npm-group/', description: '')
           string(name: 'nexus', defaultValue: 'nexus-0.dev.openshift.multivaloresgf.local:18444', description: '')
           string(name: 'imageName', defaultValue: 'gib-pasaportes', description: '')
           string(name: 'project', defaultValue: 'biometricos-qa', description: '')
           string(name: 'tag', defaultValue: 'dev', description: 'TAG de la imagen')
           string(name: 'configMap', defaultValue: 'biometricosqa-api', description: 'Config map donde se encuantran las variables de entorno')
           string(name: 'timezone', defaultValue:'America/Mexico_City', description: 'Zona horaria (logs)')
           string(name: 'languaje', defaultValue:'es', description: 'lenguaje (logs)')
      }

  stages{

        stage('Build Docker Image') {
           steps {
              sh "docker build --force-rm --no-cache -t ${params.imageName}:${params.tag} ."
            }
         }

        stage('Push Image to Nexus') {
          steps {
                sh "docker tag ${params.imageName}:${params.tag} ${params.nexus}/${params.project}/${params.imageName}:${params.tag}"
                sh "docker push ${params.nexus}/${params.project}/${params.imageName}:${params.tag}"
                sh "docker container rm \$(docker container ls -q -f 'status=exited' -f 'exited=0' -f 'exited=1') || true"
                sh "docker images -a | grep '^<none>' | awk '{print \$3}' | xargs docker rmi -f || true"
                sh "docker images -a | grep '${params.imageName}' | awk '{print \$3}' | xargs docker rmi -f || true"
          }
        }

        stage('Deploy OpenShift') {
          steps {
              withCredentials([usernamePassword(credentialsId: 'openshift-teca-multiva-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                sh "oc login -u ${USERNAME} -p ${PASSWORD} ${params.openshift}"
                sh "oc project ${params.project}"

                sh """
                if (( \$(oc get dc|grep ${params.imageName}|wc -l) )) ; then
                    # Actualizar imagen
                    echo Actualizando imagen del servicio
                    oc import-image ${params.nexus}/${params.project}/${params.imageName}:${params.tag} --confirm
                else
                    # Crear aplicación
                    echo Creando servicio desde imagen
                    oc delete imagestream ${params.imageName} --ignore-not-found=true
                    oc import-image ${params.nexus}/codi/${params.imageName}:${params.tag} --confirm
                    oc apply -f deploy/dc.${params.tag}.yaml
                fi
                """
            }
          }
        }
      }
  }
