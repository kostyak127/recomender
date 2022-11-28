# One container to rule them all
FROM keymetrics/pm2:16-alpine

WORKDIR /app

# Copy all application source code
COPY package.json ./
COPY yarn.lock ./
COPY entrypoint.sh ./

RUN pwd
RUN yarn 

COPY . .

# Build application
RUN yarn prestart:prod

ENV NODE_ENV="production"
ENTRYPOINT [ "sh", "/app/entrypoint.sh"]
