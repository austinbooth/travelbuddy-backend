const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

module.exports = app;
