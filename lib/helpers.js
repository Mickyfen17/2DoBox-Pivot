//Function to enable and disable save button
export const enableSaveBtn = () => {
  let title = $(".title").val();
  let task = $(".task").val();
  let saveBtn = $(".save");
  return title.length > 0 && task.length > 0 ? saveBtn.attr('disabled', false) : saveBtn.attr('disabled', true);
};

//clear input fields
export const clearInputs = () => {
  $(".title").val("");
  $(".task").val("");
};

export const qualityRange = (button, toDo) => {
  if($(button).hasClass("upvote") && toDo.qualityCount < toDo.qualityArr.length -1) {
    toDo.upVoteQuality();
  } else if($(button).hasClass("downvote") && toDo.qualityCount > 0) {
    toDo.downVoteQuality();
  }
};
