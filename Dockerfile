# build stage
FROM node:12 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV REACT_APP_HTTP_ENDPOINT="https://api.alpinebanking.software/api"
COPY . .
RUN npm run build


# set up production environment
# production stage
# TODO PO - lock this dockerfile to a version. E.g. 1.16-alpine
FROM nginx:stable-alpine as production
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]