const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} = require("graphql");

exports.InputExperienceType = new GraphQLInputObjectType({
  name: "ExperienceInput",
  fields: () => ({
    experience_id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLString,
    },
    location_lat: {
      type: GraphQLString,
    },
    location_long: {
      type: GraphQLString,
    },
    likes: {
      type: GraphQLInt,
    },
  }),
});

exports.InputCommentType = new GraphQLInputObjectType({
  name: "CommentInput",
  fields: () => ({
    comment_id: {
      type: GraphQLID,
    },
    created_at: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
    likes: {
      type: GraphQLInt,
    },
    username: {
      type: GraphQLString,
    },
    experience_id: {
      type: GraphQLID,
    },
  }),
});

exports.InputImageType = new GraphQLInputObjectType({
  name: "ImageInput",
  fields: () => ({
    image_id: {
      type: GraphQLID,
    },
    image_desc: {
      type: GraphQLString,
    },
    image_URL: {
      type: GraphQLString,
    },
    experience_id: {
      type: GraphQLID,
    },
  }),
});

exports.InputUpdateExperienceType = new GraphQLInputObjectType({
  name: "UpdateExperienceInput",
  fields: () => ({
    experience_id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
  }),
});
