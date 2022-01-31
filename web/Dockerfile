FROM node:alpine

LABEL version="1.0.0"
LABEL description="Farmico's Community API server's image"

# Can only use app dir
WORKDIR /usr/src/web

COPY package*.json .
COPY yarn.lock .

# RUN npm ci
RUN yarn install --immutable

COPY . .

# CMD [ "npm", "run", "dev" ]
CMD [ "yarn", "dev" ]
