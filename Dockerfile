FROM node:alpine

WORKDIR /usr/app

copy package.json ./
copy server.js ./

#Installs
RUN npm install 
EXPOSE 3000

#Command to execute and run the server.js
CMD ["node", "server.js"]
