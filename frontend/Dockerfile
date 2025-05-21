FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY ./public ./public
RUN npm run build

# serve build files with simple http server
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]
