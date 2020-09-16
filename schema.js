const db = require("./db/connection");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const ExperienceType = new GraphQLObjectType({
  name: "Experiences",
  fields: () => ({
    experience_id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    username: { type: GraphQLString },
    created_at: { type: GraphQLString },
    location_lat: { type: GraphQLString },
    location_long: { type: GraphQLString },
    likes: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    experience: {
      type: ExperienceType,
      args: { experience_id: { type: GraphQLID } },
      resolve(parent, args) {
        const { experience_id } = args;
        return db("experiences")
          .where("experience_id", experience_id)
          .then(([experience]) => experience);
      },
    },
    experiences: {
      type: new GraphQLList(ExperienceType),
      resolve() {
        return db("experiences").then((experiences) => experiences);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
