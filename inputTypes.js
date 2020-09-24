const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} = require("graphql");

exports.ExperienceInputType = new GraphQLInputObjectType({
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

exports.CommentInputType = new GraphQLInputObjectType({
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

exports.ImageInputType = new GraphQLInputObjectType({
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

exports.UpdateExperienceInputType = new GraphQLInputObjectType({
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

exports.UpdateExperienceLikesInputType = new GraphQLInputObjectType({
  name: "UpdateExperienceLikesInput",
  fields: () => ({
    experience_id: {
      type: GraphQLID,
    },
    inc_likes: {
      type: GraphQLInt,
    },
  }),
});

exports.DeleteCommentInputType = new GraphQLInputObjectType({
  name: "DeleteCommentInput",
  fields: () => ({
    comment_id: {
      type: GraphQLID,
    },
  }),
});

exports.DeleteImageInputType = new GraphQLInputObjectType({
  name: "DeleteImageInput",
  fields: () => ({
    image_id: {
      type: GraphQLID,
    },
  }),
});

exports.DeleteExperienceInputType = new GraphQLInputObjectType({
  name: "DeleteExperienceInput",
  fields: () => ({
    experience_id: {
      type: GraphQLID,
    },
  }),
});

exports.DeleteTagFromExperienceType = new GraphQLInputObjectType({
  name: "DeleteTagFromExperience",
  fields: () => ({
    experience_id: {
      type: GraphQLID,
    },
    tag_id: {
      type: GraphQLID,
    },
  }),
});

exports.UpdateCommentLikesType = new GraphQLInputObjectType({
  name: "UpdateCommentLikes",
  fields: () => ({
    comment_id: { type: GraphQLID },
    inc_likes: { type: GraphQLInt },
  }),
});

exports.AddTagToExperienceType = new GraphQLInputObjectType({
  name: "AddTagToExperience",
  fields: () => ({
    experience_id: {
      type: GraphQLID,
    },
    tag_id: {
      type: GraphQLID,
    },
  }),
});