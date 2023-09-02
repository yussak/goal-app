FROM node:18.16.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .

# 環境ごとにわける必要がある（devだとデプロイ時タスク起動しなかったので）
# でもまずはデプロイさせたいので一時コメントアウト
# CMD ["yarn", "run", "dev"]

CMD ["yarn", "run", "start"]