import {updateStoredQuality, editTodos, enableSaveBtn, clearInputs, grabValues} from './app';

//event listener for save button
$(".save").on("click", function() {
  var uniqueID = Date.now();
  grabValues(uniqueID);
  clearInputs();
  enableSaveBtn();
});

//keyup event listener for title and todos inputs
$(".title, .task").on("keyup", enableSaveBtn);

//deletes the todo card from DOM and storage
$(".entries").on("click", ".delete", function() {
  var id = $(this).parent().attr("id");
  localStorage.removeItem(id);
  $(this).parent().remove();
});

//event listener for upvote
$(".entries").on("click", ".upvote", function () {
  var currentQuality = $(this).siblings(".quality");
  currentQuality.text() === "swill" ? currentQuality.text("plausible") : currentQuality.text("genius");
  updateStoredQuality(this, currentQuality);
});

//event listener to downvote
$(".entries").on("click", ".downvote", function () {
  var currentQuality = $(this).siblings(".quality");
  currentQuality.text() === "genius" ? currentQuality.text("plausible") : currentQuality.text("swill");
  updateStoredQuality(this, currentQuality);
});


//event listener to edit title and update title value in local storage
$(".entries").on("blur", "h5", function() {
  editTodos(this, "title");
});

//event listener to edit body and update body value in local storage
$(".entries").on("blur", "p", function() {
  editTodos(this, "body");
});
