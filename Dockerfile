FROM node:23.0.0

WORKDIR /app

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/81b1373f17855a4dc21156cfe1694c31d7d1792e/wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE ${PORT}

CMD ["wait-for-it", "postgres:5432", "--", "npm", "start"]
