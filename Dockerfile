FROM node:23.0.0

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE ${PORT}

CMD ["npm", "start"]
