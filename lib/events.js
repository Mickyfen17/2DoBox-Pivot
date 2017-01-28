import {updateStoredQuality, editTodos, enableSaveBtn, clearInputs, grabValues} from './app';

//event listener for save button
$(".save").on("click", () => {
  let uniqueID = Date.now();
  grabValues(uniqueID);
  clearInputs();
  enableSaveBtn();
});

//keyup event listener for title and todos inputs
$(".title, .task").on("keyup", enableSaveBtn);

//event listener for upvote
// $(".entries").on("click", ".upvote", function () {
//   let currentQuality = $(this).siblings(".quality");
//   currentQuality.text() === "swill" ? currentQuality.text("plausible") : currentQuality.text("genius");
//   updateStoredQuality(this, currentQuality);
// });

//event listener to downvote
// $(".entries").on("click", ".downvote", function () {
//   let currentQuality = $(this).siblings(".quality");
//   currentQuality.text() === "genius" ? currentQuality.text("plausible") : currentQuality.text("swill");
//   updateStoredQuality(this, currentQuality);
// });


//event listener to edit title and update title value in local storage
// $(".entries").on("blur", "h5", function() {
//   editTodos(this, "title");
// });
//
// //event listener to edit body and update body value in local storage
// $(".entries").on("blur", "p", function() {
//   editTodos(this, "body");
// });
