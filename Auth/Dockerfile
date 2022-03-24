FROM node:10

# Create app directory to hold the application code inside the image, this will be the working #directory for your application
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN npm install phantomjs-prebuilt 

#RUN rm -rf package-lock.json node_modules

RUN npm cache clean --force

#RUN git rm package-lock.json node_modules

RUN npm install
 
RUN npm rebuild bcrypt --build-from-source

# Bundle your app's source code inside the Docker image

COPY . .

CMD [ "node", "./bin/www" ]
   
EXPOSE 3001
