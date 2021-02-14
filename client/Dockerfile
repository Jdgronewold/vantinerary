FROM node:12 as builder
WORKDIR '/app'
ARG REACT_APP_GOOGLE_MAPS_KEY
ARG BASE_URL
ENV REACT_APP_GOOGLE_MAPS_KEY=$REACT_APP_GOOGLE_MAPS_KEY
ENV BASE_URL=$BASE_URL
RUN echo "testing $REACT_APP_GOOGLE_MAPS_KEY"
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html