FROM node:latest

RUN npm install webpack -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /user/pr-dashboard
COPY . /usr/pr-dashboard
RUN cp -a /tmp/node_modules /usr/pr-dashboard

RUN npm run dev-build
RUN npm run build


RUN webpack

ENV NODE_ENV=production
ENV PORT=4000

CMD [ "npm", "start" ]

EXPOSE 4000
