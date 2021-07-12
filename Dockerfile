FROM node:14

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN npm i --quiet && npm run build

COPY . /app

EXPOSE 3000
CMD ["npm", "start"]