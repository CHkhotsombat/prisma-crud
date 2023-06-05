FROM node:18.16-alpine

WORKDIR '/app'

COPY package.json ./
EXPOSE 30033

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]