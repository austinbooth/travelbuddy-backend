exports.errorHandler = ({ message, locations, path }) => {
  const errorMessageLookupUsingPath = {
    experience: "experience not found, invalid experience id",
    comments: "comments not found, invalid experience id",
    images: "images not found, invalid experience id",
    tagsForAnExperience: "tags not found, invalid experience id",
    experiencesForATag: "experiences not found, invalid tag id",
    addExperience: "unable to create experience, invalid input",
    addComment: "unable to create comment, invalid input",
    addImage: "unable to add image, invalid input",
    updateExperience:
      "unable to update experience, invalid experience id or empty field",
    updateExperienceLikes:
      "unable to update experience likes, invalid experience id or empty field",
  };
  const errorObj = {
    msg: errorMessageLookupUsingPath[path],
  };

  if (!errorObj.msg) {
    if (message.includes("ExperienceInput"))
      errorObj.msg = "unable to create experience, please check input";
    else if (message.includes("CommentInput"))
      errorObj.msg = "unable to create comment, please check input";
    else if (message.includes("ImageInput"))
      errorObj.msg = "unable to add image, please check input";
    else if (message.includes("UpdateExperienceInput"))
      errorObj.msg = "unable to update experience, please check input";
    else if (message.includes("Int cannot represent non-integer value"))
      errorObj.msg =
        "invalid input, please enter a number and not another data type";
    else errorObj.msg = "Sorry there has been an error. Please try again.";
  }
  return errorObj;
};
