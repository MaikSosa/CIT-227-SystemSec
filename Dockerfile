FROM node:alpine

WORKDIR /usr/app

COPY package.json /usr/app
COPY server.js /usr/app

#Installs
RUN npm install 
EXPOSE 3000

#Command to execute and run the server.js
CMD ["node", "server.js"]
