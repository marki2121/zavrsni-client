FROM node as build
WORKDIR ./app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

ENV REACT_APP_API_BASE_URL="127.0.0.1"

RUN npm run build

FROM nginx
COPY --from=build /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]