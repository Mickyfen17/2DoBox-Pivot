var uniqueID;

//on load retrieve all items from local storage
window.onload = function() {
  retrieveIdeas();
};
//event listener for save button
$(".save").on("click", function() {
  uniqueID = Date.now();
  grabValues();
  clearInputs();
});
//deletes the idea card from DOM and storage
$(".entries").on("click", ".delete", function() {
  var id = $(this).parent().attr("id");
  localStorage.removeItem(id);
  $(this).parent().remove();
});
//event listener for upvote
$(".entries").on("click", ".upvote", function () {
  var thisQuality = $(this).siblings(".quality");
  upVote(thisQuality);
  updateStoredQuality(this, thisQuality);
});
//event listener to downvote
$(".entries").on("click", ".downvote", function () {
  var thisQuality = $(this).siblings(".quality");
  downVote(thisQuality);
  updateStoredQuality(this, thisQuality);
});
//conditional to check and change quality upon upvote
function upVote(currentQuality) {
  if (currentQuality.text() === "swill") {
    currentQuality.text("plausible");
  }else if (currentQuality.text() === "plausible") {
    currentQuality.text("genius");
  }
}
//conditional to check and change quality upon downvote
function downVote(currentQuality) {
  if (currentQuality.text() === "genius") {
    currentQuality.text("plausible");
  }else if (currentQuality.text() === "plausible") {
    currentQuality.text("swill");
  }
}
//updates stored quality values after a vote click
function updateStoredQuality(ideaCard, newQuality) {
  var id = $(ideaCard).parent().attr("id");
  var itemsToEdit = JSON.parse(localStorage.getItem(id));
  itemsToEdit.quality = newQuality.text();
  localStorage.setItem(id, JSON.stringify(itemsToEdit));
}
//event listener to edit title and update title value in local storage
$(".entries").on("blur", "h5", function() {
  var id = $(this).parent().attr("id");
  var updatedTitle = $(this).text();
  var itemsToEdit = JSON.parse(localStorage.getItem(id));
  itemsToEdit.title = updatedTitle;
  localStorage.setItem(id, JSON.stringify(itemsToEdit));
});
//event listener to edit body and update body value in local storage
$(".entries").on("blur", "p", function() {
  var id = $(this).parent().attr("id");
  var updatedIdea = $(this).text();
  var itemsToEdit = JSON.parse(localStorage.getItem(id));
  itemsToEdit.body = updatedIdea;
  localStorage.setItem(id, JSON.stringify(itemsToEdit));
});

// $(".entries").on("blur", ".edit", function() {
//   var id = $(this).parent().attr("id");
//   var updatedTitle = $(this).closest("h5").text();
//   var updatedIdea = $(this).closest("p").text();
//   // console.log(updatedIdea + " " + updatedTitle);
//   var newIdea = new NewIdea(id, updatedTitle, updatedIdea);
//   console.log(newIdea);
//   console.log(id);
//   // stringObj(id, newIdea);
// });


//constructor function
function NewIdea(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = "swill";
}
//clear input fields
function clearInputs () {
  $(".title").val("");
  $(".idea").val("");
}
//grabs input value and assigns to new idea object
function grabValues() {
  var title = $(".title").val();
  var idea = $(".idea").val();
  var newIdea = new NewIdea(uniqueID, title, idea);
  stringObj(uniqueID, newIdea);
}
//function to stringify new object and save to local storage
function stringObj(id, ideaObj) {
  var stringObj = JSON.stringify(ideaObj);
  localStorage.setItem(id, stringObj);
  retrieveIdeas();
}

//removes all previous ideas and then loops through local storage and parses the data
function retrieveIdeas() {
  $(".idea-card").remove();
  for(var key in localStorage) {
    var parsed = JSON.parse(localStorage[key]);
    console.log(parsed);
    displayIdea(parsed);
  }
}
//displays parsed Ideas to DOM//
function displayIdea(newIdeaContent) {
  $(".entries").prepend(`
    <article id="${newIdeaContent.id}" class="idea-card">
    <h5 class="edit" contenteditable>${newIdeaContent.title}</h5>
    <img class="delete" src="images/delete.svg">
    <p class="edit" contenteditable>${newIdeaContent.body}</p>
    <img class="upvote" src="images/upvote.svg">
    <img class="downvote" src="images/downvote.svg">
    <h6>quality:<h5 class="quality">${newIdeaContent.quality}</h5></h6>
    </article>`
  );
}
