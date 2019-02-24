FROM node:8.11

WORKDIR /criminal-watch

ADD . /criminal-watch

RUN npm install forever -g

RUN npm install apidoc -g

RUN npm install nodemon -g

RUN npm install

EXPOSE $PORT

CMD [ "forever", "start", "server.js"]