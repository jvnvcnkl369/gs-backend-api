
# Running the app 
used node v18 

create .env file from .env.example

## with docker

```
docker compose up -d 
```

## locally
```
nvm use 18
npm i
docker start gs-backend-api-db-1  // starting just postgres container
npm run start
```

# Swagger documentation

```
localhost:3000/api-docs
```
