FROM node:16
WORKDIR /usr/src/fotoon-web
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "server.js" ]