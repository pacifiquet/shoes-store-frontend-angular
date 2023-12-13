# Stage 1, "build-stage", based on Node.js, to build and compile Angular

FROM node:18.16.1 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/


RUN npm run build-prod


# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY --from=build-stage /app/dist/shoes-store-frontend/ /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80