const db = require("../db/connection");

exports.checkIfExperienceExists = (experience_id) => {
  return db("experiences")
    .where("experience_id", experience_id)
    .then(([experience]) => {
      if (!experience) return Promise.reject();
    });
};

exports.checkIfTagExists = (tag_id) => {
  return db("tags")
    .where("tag_id", tag_id)
    .then(([tag]) => {
      if (!tag) return Promise.reject();
    });
};
