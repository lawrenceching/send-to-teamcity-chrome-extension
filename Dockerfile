FROM node:latest AS build

WORKDIR /tmp
COPY package*.json ./
COPY yarn.lock ./
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn
COPY . .
RUN yarn build
RUN cp /tmp/manifest.json /tmp/build/manifest.json
RUN cp /tmp/background.js /tmp/build/background.js

FROM alpine:latest AS zip
USER root
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN apk --update add zip
WORKDIR /tmp
COPY --from=build /tmp/build /tmp/build
RUN mv /tmp/build /tmp/send-to-teamcity-browser-extension
RUN zip -r send-to-teamcity-browser-extension.zip ./send-to-teamcity-browser-extension

FROM scratch AS export-stage
COPY --from=zip /tmp/send-to-teamcity-browser-extension.zip /