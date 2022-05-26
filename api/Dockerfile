FROM node:alpine

LABEL version="1.0.0"
LABEL description="Farmico's Community API server's image"

WORKDIR /usr/src/api

COPY package*.json .

# RUN yarn install --immutable
# RUN npm ci
RUN npm install

COPY . .

# CMD [ "yarn", "dev" ]
CMD [ "npm", "run", "dev" ]
