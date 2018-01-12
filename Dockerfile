#For normal computers
FROM arm32v7/node

RUN npm install webpack -g

# create working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json /usr/src/app/
RUN npm install

# confirm install
RUN node -v
RUN npm -v

# FOR production 
# RUN npm install --only=production

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD ["npm", "run webpack"]
CMD ["npm", "start"]
