FROM node:16.14-alpine

WORKDIR /back-end

COPY . .   

RUN npm install

EXPOSE 3001

ENTRYPOINT [ "npm", "run", "dev" ]