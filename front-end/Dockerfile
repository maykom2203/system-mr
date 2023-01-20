FROM node:16.14-alpine
WORKDIR /front-end

COPY . .

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]