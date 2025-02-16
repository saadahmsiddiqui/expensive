# Running the database

```sh
docker run --name expensiveDb -e POSTGRES_PASSWORD=expensive -e POSTGRES_PASSWORD=expensive -e POSTGRES_DB=expensive -d -p 5432:5432 postgres
```