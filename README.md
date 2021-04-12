To-do App
===========

This is a [mono repository](https://en.wikipedia.org/wiki/Monorepo) containing
- [Database](./db) - A mongodb container
- [API](./api) - An API build with NodeJS and Express
- [Frontend](./front) - A VueJS single page application

## Requirements
* Node v12 or later
* Git
* Docker

## Running the project locally

### Database
1. Run the [db/start.sh](./db/start.sh) script 

### API
1. `cd api`
1. Create a `.env` file based on the [.env.example](./api/.env.example)
1. Run `npm ci`
1. Run `npm start`
1. Navigate to http://localhost:3000
### Frontend
1. `cd front`
1. Create a `.env` file based on the [.env.example](./front/.env.example)
1. Run `npm ci`
1. Run `npm start`
1. Navigate to http://localhost:3000