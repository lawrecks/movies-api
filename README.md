# movies-api

A NodeJs service which allows you to create a movie based on it's title (additional movie details will be fetched) and fetch all created movies.

---

## Built With

- Node.js
- PostgreSQL
- Docker
- Git
- Express
- Mocha, chai and supertest
- Json Web Token
- Postman
- Circle CI

## Requirements

You will need Node.js (version 14 and above) and a node global package installed in your environment.

### Node

- #### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the installer.
    Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

    ##### Installation Commands

        $ sudo apt install nodejs
        $ sudo apt install npm

- #### Other Operating Systems

    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).
    If the installation was successful, you should be able to run the following command.

    ##### Verify versions

        $ node -v
        v14.17.5
        $ npm -v
        6.14.14

---
## Clone this project

    $ git clone https://github.com/lawrecks/movies-api.git
    $ cd movies-api
    
## Configure app

- Create a file named `.env` in the project root directory
- Add the environment variables as described in the `.env.example` file

## Install dependencies
    $ npm install

## Run with Docker

### Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the service

Run the app with following command

    $ JWT_SECRET=secret OMDB_API_KEY=your_omdb_api_key docker-compose up -d
You can obtain your API KEY at https://omdbapi.com/apikey.aspx
    
By default, the app should run on port `1918`
        
To stop the app, run
    
    $ docker-compose down
    
## Run with NPM

### Running this project locally
    $ npm run dev

### Running tests

    $ npm test


## Documentation

Postman: https://documenter.getpostman.com/view/10148336/UVyn2JwS

## Database Schema

https://dbdiagram.io/d/62415a91bed61838730be234

## Show your support

Give a ⭐️ if you like this project!

## Copyright

Copyright (c) 2021 Ugochukwu Ejiogu
