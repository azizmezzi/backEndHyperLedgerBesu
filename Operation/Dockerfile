FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf package-lock.json node_modules

RUN npm cache clean --force

RUN npm uninstall -g

RUN npm -f install
 
COPY . .

CMD [ "node", "./bin/www" ]
    
EXPOSE 3002
