# Travel buddy

Welcome to the Travel Buddy API, the backend for a React app where users can explore the hidden gems of travel, submitted by fellow travellers.

You can find the hosted verson here: https://travel-buddy-2020.herokuapp.com/graphql

This was part of a two-week, four-person group final project at the [Northcoders bootcamp](https://northcoders.com/). It uses the following technologies:

- Node.js
- Express
- GraphQL
- PostgreSQL
- Knex

It was built following the test-driven development (TDD) process using Jest and Supertest.

## Endpoint

As we used GraphQL, there is only one endpoint: https://travel-buddy-2020.herokuapp.com/graphql

We have left the GraphiQL tool running so you can try making some queries in the browser. As you type a query, the autocomplete will guide you as to what fields you can request. An example query is shown below.

```
{
  experience(experience_id:5){
    experience_id
    title
    body
  }
}
```

## Getting started & Installation

### Prerequisites

To run this API on your machine, you will need Node.js and Postgres installed on your machine.

To install Postgres, go to: https://www.postgresql.org/download/
The version required is a minimum of v. 12.1

To install Node, go to: https://nodejs.org/en/download/
The version required is a minimum of v. 13.8.0

### Installation

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Clone a copy of the repository on your machine using the below command:

```javascript
git clone https://github.com/austinbooth/travelbuddy-backend.git
```

2. Install the required dependencies:

```javascript
npm install
```

### How to create your user.info.js file (required for Linux users)

Knex requires your username and password in order to access Postgres.

You should create a _user.info.js_ file in the project root and add this file to the _.gitignore_ file (along with the _node_modules_ folder.) An example setup of the file is below:

```javascript
const userInfo = {
  username: "your-postgres-username",
  password: "your-postgres-password",
};

module.exports = userInfo;
```

**Note:** If you are using Mac OS you will not need this file as your machine will remember your PSQL username and password.

### Setting up the database

This API uses two databases, a test database and a development database.

To create both databases and seed them, run the following scripts in your terminal:

```
npm run setup-dbs
npm run seed
npm run seed-test
```

## Running the Tests

Jest was used for automated testing (TDD) whilst developing this API. To execute the tests, run the following command:

```
npm test app
```

To run the tests written for the utils functions, run the following command:

```
npm test utils
```

To run the tests written for the error handling, run the following command:

```
npm test error-handling
```

## Acknowledgments

We'd like to thank the team at Northcoders for providing us with the knowledge and skills to create this API.
