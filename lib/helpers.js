// helper function to enable/disable save button
export const enableSaveBtn = (charsCount) => {
  let title = $(".title").val();
  let task = $(".task").val();
  let saveBtn = $(".save");
  if(charsCount < 0) {
    saveBtn.attr('disabled', true);
    $("#char-count").addClass("overCharCount");
  } else {
    $("#char-count").removeClass("overCharCount");
    return title.length > 0 && task.length > 0 ? saveBtn.attr('disabled', false) : saveBtn.attr('disabled', true);
  }
};

// helper function to keep track on the characters in the task input field
export const charCounter = () => {
  let inputLength = $(".task").val().length;
  let chars = 120 - inputLength;
  enableSaveBtn(chars);
  $("#char-count").text(chars);
};

// helper function to enable/disable show all completed button on page reload
export const checkForCompletedTodos = number => {
  return number > 0 ? $(".show").attr('disabled', false) : $(".show").attr('disabled', true);
};

// clear input fields
export const clearInputs = () => {
  $(".title").val("");
  $(".task").val("");
};

// helper function to determine which button was clicked and to toggle the todos quality count
export const qualityRange = (button, toDo) => {
  if($(button).hasClass("upvote") && toDo.qualityCount < toDo.qualityArr.length -1) {
    toDo.upVoteQuality();
  } else if($(button).hasClass("downvote") && toDo.qualityCount > 0) {
    toDo.downVoteQuality();
  }
};

// helper function to get around the bug with number 0 in local storage
export const ifZero = number => number === 0 ? number.toString() : number;
