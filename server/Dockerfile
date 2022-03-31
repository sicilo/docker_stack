FROM node:16

RUN mkdir -p /api

WORKDIR /api

COPY ./package.json ./
RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "yarn" , "dev" ]