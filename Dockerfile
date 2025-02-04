FROM node:20-alpine

WORKDIR /app

RUN yarn global add prisma

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE 3333

CMD ["yarn", "dev"]