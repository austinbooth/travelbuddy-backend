const db = require("./db/connection");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
} = require("graphql");

const ExperienceType = new GraphQLObjectType({
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

const CommentType = new GraphQLObjectType({
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

const ImageType = new GraphQLObjectType({
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

const TagType = new GraphQLObjectType({
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

const InputExperienceType = new GraphQLInputObjectType({
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

const InputCommentType = new GraphQLInputObjectType({
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

const InputImageType = new GraphQLInputObjectType({
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
      args: {
        experience_id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        const { experience_id } = args;
        return db("comments")
          .where("experience_id", experience_id)
          .then((comments) => comments);
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
        return db("images").where("experience_id", experience_id);
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
        return db
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
          .where("tag_experience_junction.experience_id", experience_id);
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
        return db
          .select("*")
          .from("experiences")
          .innerJoin(
            "tag_experience_junction",
            "experiences.experience_id",
            "tag_experience_junction.experience_id"
          )
          .where("tag_experience_junction.tag_id", tag_id);
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
        input: { type: InputExperienceType }, // this is the type of data being entered into the db
      },
      resolve(parent, args) {
        // this are the data fields that can be put onto the query
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
        input: { type: InputCommentType },
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
        input: { type: InputImageType },
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
