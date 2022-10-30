# backendのCloudRunデプロイ用
FROM node:16.18.0-alpine

WORKDIR /usr/src/app
COPY app/backend/package.json ./
COPY app/backend/yarn.lock ./
RUN yarn install

COPY app/backend/server.ts ./
COPY app/backend/tsconfig.json ./

CMD ["yarn", "build"]

EXPOSE 8080