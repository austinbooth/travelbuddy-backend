const db = require("./db/connection");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const { checkIfExperienceExists, checkIfTagExists } = require("./utils");

const { ExperienceType, CommentType, ImageType, TagType } = require("./types");

const {
  ExperienceInputType,
  CommentInputType,
  ImageInputType,
  UpdateExperienceInputType,
  UpdateExperienceLikesInputType,
  DeleteCommentInputType,
  DeleteImageInputType,
  DeleteExperienceInputType,
  DeleteTagFromExperienceType,
  UpdateCommentLikesType,
} = require("./inputTypes");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "this is the data we can retrieve from the database",
  fields: {
    experience: {
      type: ExperienceType,
      args: {
        experience_id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const { experience_id } = args;
        return db("experiences")
          .where("experience_id", experience_id)
          .then(([experience]) => {
            if (experience) return experience;
            return Promise.reject();
          });
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
      args: {
        experience_id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const { experience_id } = args;
        const promises = [
          db("comments").where("experience_id", experience_id),
          checkIfExperienceExists(experience_id),
        ];
        return Promise.all(promises).then((comments) => {
          return comments[0];
        });
      },
    },
    images: {
      type: new GraphQLList(ImageType),
      args: {
        experience_id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const { experience_id } = args;

        const promises = [
          db("images").where("experience_id", experience_id),
          checkIfExperienceExists(experience_id),
        ];
        return Promise.all(promises).then((images) => {
          return images[0];
        });
      },
    },
    tagsForAnExperience: {
      type: new GraphQLList(TagType),
      args: {
        experience_id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const { experience_id } = args;
        const promises = [
          db
            .select(
              "tags.tag_id",
              "tags.tag_text",
              "tag_experience_junction.experience_id"
            )
            .from("tags")
            .innerJoin(
              "tag_experience_junction",
              "tags.tag_id",
              "tag_experience_junction.tag_id"
            )
            .where("tag_experience_junction.experience_id", experience_id),
          checkIfExperienceExists(experience_id),
        ];
        return Promise.all(promises).then((tags) => {
          return tags[0];
        });
      },
    },
    experiencesForATag: {
      type: new GraphQLList(ExperienceType),
      args: {
        tag_id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const { tag_id } = args;

        const promises = [
          db
            .select("*")
            .from("experiences")
            .innerJoin(
              "tag_experience_junction",
              "experiences.experience_id",
              "tag_experience_junction.experience_id"
            )
            .where("tag_experience_junction.tag_id", tag_id),
          checkIfTagExists(tag_id),
        ];
        return Promise.all(promises).then((experiences) => {
          return experiences[0];
        });
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  description: "this is the data we can change or add to the database",
  fields: {
    addExperience: {
      type: ExperienceType, // this is the return type
      args: {
        input: { type: ExperienceInputType }, // this is the type of data being entered into the db
      },
      resolve(parent, args) {
        // these are the data fields that can be put onto the query
        const experience = {
          // experience_id auto-generated by db
          title: args.input.title, // not nullable
          body: args.input.body, // not nullable
          username: args.input.username, // not nullable
          created_at: args.input.created_at, // defaults to now
          location_lat: args.input.location_lat, // not nullable
          location_long: args.input.location_long, // not nullable
          likes: args.input.likes, // defaults to 0
        };
        return db
          .insert(experience)
          .into("experiences")
          .returning("*")
          .then((experienceRows) => {
            return experienceRows[0];
          });
      },
    },
    addComment: {
      type: CommentType,
      args: {
        input: { type: CommentInputType },
      },
      resolve(parent, args) {
        const comment = {
          // comment_id auto-generated
          created_at: args.input.created_at, //defaults to now
          body: args.input.body,
          likes: args.input.likes, // defaults to 0
          username: args.input.username, //not nullable
          experience_id: args.input.experience_id, // not nullable
        };
        return db
          .insert(comment)
          .into("comments")
          .where("experience_id", comment.experience_id)
          .returning("*")
          .then((commentRows) => {
            return commentRows[0];
          });
      },
    },
    addImage: {
      type: ImageType,
      args: {
        input: { type: ImageInputType },
      },
      resolve(parent, args) {
        const image = {
          // image_id auto-generated
          image_desc: args.input.image_desc,
          image_URL: args.input.image_URL,
          experience_id: args.input.experience_id, // not nullable
        };
        return db
          .insert(image)
          .into("images")
          .where("experience_id", image.experience_id)
          .returning("*")
          .then((imageRows) => {
            return imageRows[0];
          });
      },
    },
    updateExperience: {
      type: ExperienceType,
      args: {
        input: { type: UpdateExperienceInputType },
      },
      resolve(parent, args) {
        const { experience_id } = args.input;
        const newExperienceData = {
          title: args.input.title,
          body: args.input.body,
        };
        return db("experiences")
          .where("experience_id", experience_id)
          .update(newExperienceData)
          .returning("*")
          .then(([updatedExperience]) => {
            if (updatedExperience) return updatedExperience;
            return Promise.reject();
          });
      },
    },
    updateExperienceLikes: {
      type: ExperienceType,
      args: {
        input: { type: UpdateExperienceLikesInputType },
      },
      resolve(parent, args) {
        const { experience_id, inc_likes } = args.input;
        return db("experiences")
          .where("experience_id", experience_id)
          .increment("likes", inc_likes)
          .returning("*")
          .then(([updatedExperience]) => {
            if (updatedExperience) return updatedExperience;
            return Promise.reject();
          });
      },
    },
    deleteComment: {
      type: CommentType,
      args: {
        input: { type: DeleteCommentInputType },
      },
      resolve(parent, args) {
        const { comment_id } = args.input;
        return db("comments")
          .where("comment_id", comment_id)
          .del()
          .returning("*")
          .then(([deleted]) => {
            if (deleted === undefined) return Promise.reject();
            return deleted;
          });
      },
    },
    deleteImage: {
      type: ImageType,
      args: {
        input: { type: DeleteImageInputType },
      },
      resolve(parent, args) {
        const { image_id } = args.input;
        return db("images")
          .where("image_id", image_id)
          .del()
          .returning("*")
          .then(([deleted]) => {
            if (deleted === undefined) return Promise.reject();
            return deleted;
          });
      },
    },
    deleteExperience: {
      type: ExperienceType,
      args: {
        input: { type: DeleteExperienceInputType },
      },
      resolve(parent, args) {
        const { experience_id } = args.input;
        return db("experiences")
          .where("experience_id", experience_id)
          .del()
          .returning("*")
          .then(([deleted]) => {
            if (deleted === undefined) return Promise.reject();
            return deleted;
          });
      },
    },
    deleteTagFromExperience: {
      type: TagType,
      args: {
        input: { type: DeleteTagFromExperienceType },
      },
      resolve(parent, args) {
        const { experience_id, tag_id } = args.input;
        return db("tag_experience_junction")
          .where({ experience_id, tag_id })
          .del()
          .returning("*")
          .then(([deleted]) => {
            if (deleted === undefined) return Promise.reject();
            return deleted;
          });
      },
    },
    updateCommentLikes: {
      type: CommentType,
      args: {
        input: { type: UpdateCommentLikesType },
      },
      resolve(parent, args) {
        const { comment_id, inc_likes } = args.input;
        return db("comments")
          .where("comment_id", comment_id)
          .increment("likes", inc_likes)
          .returning("*")
          .then(([updatedComment]) => {
            if (updatedComment) return updatedComment;
            return Promise.reject();
          });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
