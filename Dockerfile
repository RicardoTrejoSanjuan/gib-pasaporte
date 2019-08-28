FROM nexus-0.dev.openshift.multivaloresgf.local:18444/node:12.7.0-alpine-curl
RUN mkdir /opt/app-root/
WORKDIR /opt/app-root/
COPY src /opt/app-root/src
COPY routes /opt/app-root/routes
COPY .npmrc /opt/app-root/.npmrc
COPY package.json /opt/app-root/package.json
COPY tsconfig.json /opt/app-root/tsconfig.json
RUN npm i --only=prod --verbose
EXPOSE 8080
ENTRYPOINT ["npm", "start"]
