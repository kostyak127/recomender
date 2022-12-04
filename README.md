# Restaurant recommender
## _Free, opensource and easy used recommendation system service_

## _HOW TO USE?_
## First step:
## Clone this repository and fill all required params in .env file
1) PORT -- Server port (EXAMPLE: 3000)
2) DB_HOST -- Database address (EXAMPLE: 127.0.0.1 or api.something.com) 
3) DB_USER -- Database user
4) DB_PORT -- Your database port
5) DB_NAME -- Your database name
6) DB_PASSWORD -- Your database password
7) TOKEN -- Service token. It is token to pass in authorization header to create projects
## Second step:
## Run your application
**RECOMENDED TO START APPLICATION WITH DOCKER**
**You can run your application via docker with writing your docker-compose file like this**
```
services:
  db:
    image: postgres:13
    restart: always
    logging:
      driver: "json-file"
      options:
        max-size: 128m
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
    ports:
      - 5432:5432
    volumes:
      - ./volumes/pg_data:/var/lib/postgresql/data

  backend:
    image: {{YOUR IMAGE HERE}}
    build:
      dockerfile: Dockerfile
    restart: always
    ports:
      - 3000:80
    logging:
      driver: "json-file"
      options:
        max-size: 128m
    env_file:
      - .env

```
**Or you can ran it with with yarn/npm (Application works with Node >= 16)**
```
//installing yarn
npm install yarn 
// install all requirements
yarn
yarn start:prod
```

## FIRST TIME USAGE
On first time using this service you need to initialize database and create schemas
```
yarn evolutions:init
yarn evolutions:run -y
```
## Routes and algotithm of using

**You can see swagger api documentation on {{yourDomain}}/api**

1) Saving your project.
First of all you should create project (project is synonym of atomic restaurant).
Make Api Request on route /project with service token (filled in .env file)
Use apiKey from create order response to other routes in project
2) Handling order.
Service doesnt save order information, so use route /order only on time in other way meal ratings will compile not correct.
Pass your project apiKey in authorization header.
3) Getting recomendation (/recommendation route).
You can get recommendation for user or general recomendation
userId query param is not required, so if userId not passed, server returns general recommendations.

## Optional .env params
**You can set custom cache ttl by passing your cache ttl in seconds** 
1) MEAL_TTL
2) RATING_TTL
3) USER_TTL
4) PROJECT_TTL

**You can also configure rating compiling formule**
Service use quantity of products in order by default but you can turn off checking quantity and use only price in rating compilation just set 
USE_QUANTITY_IN_RATING_COMPILATION=false
Service hasn`t minimal meal price to compile rating. You can set minimal meal price like this
MIN_MEAL_PRICE_FOR_RECOMMEND=400