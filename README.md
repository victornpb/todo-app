To-do App
===========

![Untitled 2021-04-12 05_12_12](https://user-images.githubusercontent.com/3372598/114363332-aac93700-9b4e-11eb-84e9-7c1b6ca33e9e.gif)
![2021-04-12 05-15-13 2021-04-12 05_18_04](https://user-images.githubusercontent.com/3372598/114363339-abfa6400-9b4e-11eb-9c5a-341c20c3ee55.gif)

This is a [mono repository](https://en.wikipedia.org/wiki/Monorepo) containing
- [Database](./db) - A mongodb container
- [API](./api) - An API build with NodeJS and Express
- [Frontend](./front) - A VueJS single page application

## Requirements
* Node v10 or 12
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
