FROM node:16.13.1

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package-lock.json package.json /app/
RUN npm ci
ADD . /app

CMD ["npm", "run", "docker:start"]
