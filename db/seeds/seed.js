const {
  commentData,
  experienceData,
  imageData,
  tagData,
  userData,
  tagExperienceJunctionData,
} = require("../data/index");
const tagExperienceJunctions = require("../data/test-data/tag-experience-junctions");

const { formatDates, makeRefObj, formatComments } = require("../utils/utils");

exports.seed = function (knex) {
  const tagInsertions = knex("tags").insert(tagData).returning("*");

  const experiencesWithoutBelongsTo = experienceData.map((experience) => {
    const experienceCopy = { ...experience };
    delete experienceCopy.belongs_to_tag_text;
    return experienceCopy;
  });
  const experiencesWithCorrectDates = formatDates(experiencesWithoutBelongsTo);

  const experienceInsertions = knex("experiences")
    .insert(experiencesWithCorrectDates)
    .returning("*");

  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex("users").insert(userData))
    .then(() => Promise.all([tagInsertions, experienceInsertions]))
    .then(([tags, experiences]) => {
      const tagsRefObj = makeRefObj(tags, "tag_text", "tag_id");
      const experiencesRefObj = makeRefObj(
        experiences,
        "title",
        "experience_id"
      );
      const tagIdExperienceIdData = tagExperienceJunctionData.map((pair) => {
        const { tag_text, belongs_to_experience_title } = pair;
        const experience_id = experiencesRefObj[belongs_to_experience_title];
        const tag_id = tagsRefObj[tag_text];
        return { tag_id, experience_id };
      });
      const junctionInsertions = knex("tag_experience_junction").insert(
        tagIdExperienceIdData
      );
      return Promise.all([experiencesRefObj, junctionInsertions]);
    })
    .then(([experiencesRefObj]) => {
      const commentsWithAllInfoForDb = formatComments(
        commentData,
        experiencesRefObj
      );
      const imageDataWithAllInfoForDb = imageData.map((image) => {
        const { image_desc, belongs_to_title, image_URL } = image;
        const experience_id = experiencesRefObj[belongs_to_title];
        return { image_desc, experience_id, image_URL };
      });
      const commentInsertions = knex("comments").insert(
        commentsWithAllInfoForDb
      );
      const imageInsertions = knex("images").insert(imageDataWithAllInfoForDb);
      return Promise.all([commentInsertions, imageInsertions]);
    });
};
