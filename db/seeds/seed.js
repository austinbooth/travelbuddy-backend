const {
  commentData,
  experienceData,
  imageData,
  tagData,
  userData,
} = require("../data/index");

const { formatDates, makeRefObj, formatComments } = require("../utils/utils");

exports.seed = function (knex) {
  const tagInsertions = knex("tags").insert(tagData).returning("*");
  const userInsertions = knex("users").insert(userData);

  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => Promise.all([tagInsertions, userInsertions]))
    .then(([tags]) => {
      const tagsRefObj = makeRefObj(tags, "tag_text", "tag_id");
      const experiencesWithoutBelongsTo = experienceData.map((experience) => {
        const {
          title,
          body,
          username,
          created_at,
          location_lat,
          location_long,
          likes,
          belongs_to_tag_text: belongsToTags,
        } = experience;
        belongsToTags.map()
        
      });
    });
};
