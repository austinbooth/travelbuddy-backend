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

const CommentType = new GraphQLObjectType({
  name: "Comments",
  fields: () => ({
    comment_id: { type: GraphQLID },
    created_at: { type: GraphQLString },
    body: { type: GraphQLString },
    likes: { type: GraphQLInt },
    username: { type: GraphQLString },
    experience_id: { type: GraphQLID },
  }),
});

const ImageType = new GraphQLObjectType({
  name: "Images",
  fields: () => ({
    image_id: { type: GraphQLID },
    image_desc: { type: GraphQLString },
    experience_id: { type: GraphQLID },
    image_URL: { type: GraphQLString },
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
    comments: {
      type: new GraphQLList(CommentType),
      args: { experience_id: { type: GraphQLID } },
      resolve(parent, args) {
        const { experience_id } = args;
        return db("comments")
          .where("experience_id", experience_id)
          .then((comments) => comments);
      },
    },
    images: {
      type: new GraphQLList(ImageType),
      args: { experience_id: { type: GraphQLID } },
      resolve(parent, args) {
        const { experience_id } = args;
        return db("images").where("experience_id", experience_id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
