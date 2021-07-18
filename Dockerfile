FROM node:14.17.1-alpine as build
WORKDIR /app
COPY . ./
RUN apk add --update nodejs npm
RUN npm install
RUN npm run-script build
RUN ls

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
