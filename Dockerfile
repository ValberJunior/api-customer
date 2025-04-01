FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN yarn install --frozen-lockfile

COPY . .

RUN npx prisma generate

EXPOSE 3333

CMD ["yarn", "dev"]