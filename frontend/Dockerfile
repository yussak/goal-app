FROM node:18.16.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .

CMD ["yarn", "run", "dev"]