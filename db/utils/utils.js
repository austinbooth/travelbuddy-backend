exports.formatDates = (arr) => {
  const reformattedArr = arr.map((obj) => {
    const objCopy = { ...obj };
    const psqlTimestamp = new Date(objCopy.created_at);
    objCopy.created_at = psqlTimestamp;
    return objCopy;
  });
  return reformattedArr;
};

exports.makeRefObj = (arr, prop, value) => {
  const refObj = {};
  arr.forEach((item) => {
    refObj[item[prop]] = item[value];
  });
  return refObj;
};

exports.formatComments = (comments, experienceRefObj) => {
  const comments_with_article_ids = comments.map((comment) => {
    const {
      comment_id,
      created_at,
      body,
      likes,
      username,
      belongs_to_title,
    } = comment;
    return {
      comment_id,
      created_at,
      body,
      likes,
      username,
      experience_id: experienceRefObj[belongs_to_title],
    };
  });

  const correctlyFormattedComments = this.formatDates(
    comments_with_article_ids
  );
  return correctlyFormattedComments;
};

exports.formatsExperiences = (experiences, tagsRefObj) => {
  const experiencesWithoutBelongsToTagText = experiences.map((experience) => {
    const {
      experience_id,
      title,
      body,
      username,
      created_at,
      location_lat,
      location_long,
      likes,
    } = experience;
    return {
      experience_id,
      title,
      body,
      username,
      created_at,
      location_lat,
      location_long,
      likes,
    };
  });

  const experiencesWithReformattedDates = this.formatDates(
    experiencesWithoutBelongsToTagText
  );
  return experiencesWithReformattedDates;
};
