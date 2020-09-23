exports.errorHandler = ({ message, locations, path }) => {
  // console.log("message:", message);
  // console.log("path:", path);
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
    deleteComment: "unable to delete comment, invalid comment id",
    deleteImage: "unable to delete image, invalid image id",
    deleteExperience: "unable to delete experience, invalid experience id",
    deleteTagFromExperience:
      "unable to delete tag from experience, invalid experience id or tag_id",
    updateCommentLikes: "unable to update comment likes, invalid comment id",
  };
  const errorObj = {
    msg: errorMessageLookupUsingPath[path],
  };

  if (!errorObj.msg) {
    if (message.includes('"RootQueryType.experience"'))
      errorObj.msg = "unable to find experience, please check input";
    else if (message.includes('"Experiences"'))
      errorObj.msg = "unable to find experiences, please check input";
    else if (message.includes('"RootQueryType.comments"'))
      errorObj.msg = "unable to find comments, please check input";
    else if (message.includes('"Comments"'))
      errorObj.msg = "unable to find comments, please check input";
    //
    else if (message.includes('"RootQueryType.images"'))
      errorObj.msg = "unable to find images, please check input";
    //
    else if (message.includes('"ExperienceInput"'))
      errorObj.msg = "unable to create experience, please check input";
    else if (message.includes('"CommentInput"'))
      errorObj.msg = "unable to create comment, please check input";
    else if (message.includes('"ImageInput"'))
      errorObj.msg = "unable to add image, please check input";
    else if (message.includes('"UpdateExperienceInput"'))
      errorObj.msg = "unable to update experience, please check input";
    else if (message.includes("Int cannot represent non-integer value"))
      errorObj.msg =
        "invalid input, please enter a number and not another data type";
    else if (message.includes('"DeleteCommentInput"'))
      errorObj.msg = "unable to delete comment, please check input";
    else if (message.includes('"DeleteImageInput"'))
      errorObj.msg = "unable to delete image, please check input";
    else if (message.includes('"DeleteExperienceInput"'))
      errorObj.msg = "unable to delete experience, please check input";
    else if (message.includes('"DeleteTagFromExperience"'))
      errorObj.msg = "unable to delete tag from experience, please check input";
    else if (message.includes('"UpdateCommentLikes"'))
      errorObj.msg = "unable to update comment likes, please check input";
    else errorObj.msg = "Sorry there has been an error. Please try again.";
  }
  return errorObj;
};
