FROM node:alpine

LABEL version="1.0.0"
LABEL description="Farmico's Community API server's image"

# Can only use app dir
WORKDIR /usr/src/api

COPY package*.json .

# RUN yarn install --immutable
RUN npm ci

COPY . .

# CMD [ "yarn", "dev" ]
CMD [ "npm", "run", "dev" ]
