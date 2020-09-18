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
        let experience = {
          title: args.input.title,
          body: args.input.body,
          username: args.input.username,
          created_at: args.input.created_at,
          location_lat: args.input.location_lat,
          location_long: args.input.location_long,
          likes: args.input.likes,
        };
        return db
          .insert(experience)
          .into("experiences")
          .returning("*")
          .then((row) => {
            return row[0];
          });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
