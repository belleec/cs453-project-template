# CS453 Project Checkpoint 1
Belle Cowan
## Repository Structure
```shell
cs453-project-template
│
├── apps
│ ├── api
│ │ Server-side application
│ │
│ └── client
│ Simple browser client
│
├── database
│ Database schema, migrations, and seed data
│
├── docs
│ Architecture documentation
│
├── scripts
│ Utility scripts for development
│
├── docker-compose.yml
│ Starts PostgreSQL database
│
└── README.md
```
### How to Install dependencies
```shell
cd apps/api
npm install
```
---
## How to Start the database

This project uses Docker to run PostgreSQL locally.
```shell
docker-compose up -d
```
This will start a PostgreSQL database container.

---
### How to Run the server
```shell
cd apps/api
npm run dev
```

The API server should start locally.

---
## How to Create Database Tables

To create the database tables, you will need to have PostgreSQL installed and running.

Run the following command from the repo root (cs453-project-template/)
```shell
psql postgresql://postgres:postgres@localhost:5432/cs453 -f database/schema.sql
```

## API Routes

| Method | Route        | Description             |
|--------|--------------|-------------------------|
| GET    | `/health`    | API health check        |
| GET    | `/db-health` | Database health check   |
| GET    | `/tasks`     | Return all tasks        |
| POST   | `/tasks`     | Create a task           |
| GET    | `/tasks/:id` | Return a task by ID     |
| PATCH  | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task by ID     |
---
## Reflection Questions
### What is the difference between an in-memory API and a database-backed API?
An in-memory API only stores data while the server is running, so everything is lost when the server restarts. A database-backed API stores the data in a database instead, so the information is still there the next time the server is started.
### Why is it useful to separate routes, services, and database logic?
It is useful to separate the routes, services, and database logic because it makes the project much easier to work in when everything is organized neatly and the files don't get too unnecessarily large. The routes only have to handle the requests and responses, and the service functions handle the SQL queries.
### What HTTP status codes did you use, and why?
I used:

- 200 for successful requests
- 201 when a new task was created
- 204 when a task was deleted
- 400 when the client sent invalid input
- 404 when a task couldn't be found 
- 500 if something unexpected happened on the server

I used these specific status codes because they are the same codes we have been using in the labs, and they fit each scenario based on their standardized uses.
### What happens when a client requests a task ID that does not exist?
The API returns a 404 status code along with a JSON error message saying that the task was not found. This lets the client know that the request was valid, but the task they were looking for doesn't exist.
### What was the hardest part of connecting the API to PostgreSQL?
The hardest part of connecting the API to PostgreSQL was downloading PostgreSQL because the wizard asked way too many questions.