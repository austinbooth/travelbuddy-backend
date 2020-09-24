const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require("graphql");

exports.ExperienceType = new GraphQLObjectType({
  name: "Experiences",
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

exports.CommentType = new GraphQLObjectType({
  name: "Comments",
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

exports.ImageType = new GraphQLObjectType({
  name: "Images",
  fields: () => ({
    image_id: {
      type: GraphQLID,
    },
    image_desc: {
      type: GraphQLString,
    },
    experience_id: {
      type: GraphQLID,
    },
    image_URL: {
      type: GraphQLString,
    },
  }),
});

exports.TagType = new GraphQLObjectType({
  name: "TagsForAnExperience",
  fields: () => ({
    tag_id: {
      type: GraphQLID,
    },
    tag_text: {
      type: GraphQLString,
    },
    experience_id: {
      type: GraphQLID,
    },
  }),
});

exports.NewTagType = new GraphQLObjectType({
  name: "NewTag",
  fields: () => ({
    tag_id: {
      type: GraphQLID,
    },
    tag_text: {
      type: GraphQLString,
    },
  }),
});
