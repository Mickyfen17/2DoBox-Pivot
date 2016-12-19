var uniqueID;

window.onload = function() {
  retrieveIdeas();
};

$(".save").on("click", function() {
  uniqueID = Date.now();
  grabValues();
  clearInputs();
});

$(".entries").on("click", ".delete", function() {
  var id = $(this).parent().attr("id");
  localStorage.removeItem(id);
  $(this).parent().remove();
});

$(".entries").on("click", ".upvote", function () {
  var thisQuality = $(this).siblings(".quality");
  upVote(thisQuality);
  updateStoredQuality(this, thisQuality);
});
$(".entries").on("click", ".downvote", function () {
  var thisQuality = $(this).siblings(".quality");
  downVote(thisQuality);
  updateStoredQuality(this, thisQuality);
});
function updateStoredQuality(ideaCard, newQuality) {
  var id = $(ideaCard).parent().attr("id");
  var itemsToEdit = JSON.parse(localStorage.getItem(id));
  itemsToEdit.quality = newQuality.text();
  localStorage.setItem(id, JSON.stringify(itemsToEdit));
}
function upVote(currentQuality) {
  if (currentQuality.text() === "swill") {
    currentQuality.text("plausible");
  }else if (currentQuality.text() === "plausible") {
    currentQuality.text("genius");
  }
}
function downVote(currentQuality) {
  if (currentQuality.text() === "genius") {
    currentQuality.text("plausible");
  }else if (currentQuality.text() === "plausible") {
    currentQuality.text("swill");
  }
}

$(".entries").on("blur", "h5", function() {
  var id = $(this).parent().attr("id");
  var updatedTitle = $(this).text();
  var updatedIdea = $(this).siblings("p").text();
  var newIdea = new NewIdea(id, updatedTitle, updatedIdea);
  stringObj(id, newIdea);
});
$(".entries").on("blur", "p", function() {
  var id = $(this).parent().attr("id");
  var updatedIdea = $(this).text();
  var updatedTitle = $(this).siblings("h5").text();
  var newIdea = new NewIdea(id, updatedTitle, updatedIdea);
  stringObj(id, newIdea);
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

function NewIdea(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = "swill";
}

function clearInputs () {
  $(".title").val("");
  $(".idea").val("");
}

function grabValues() {
  var title = $(".title").val();
  var idea = $(".idea").val();
  var newIdea = new NewIdea(uniqueID, title, idea);
  stringObj(uniqueID, newIdea);
}

function stringObj(id, ideaObj) {
  var stringObj = JSON.stringify(ideaObj);
  localStorage.setItem(id, stringObj);
  retrieveIdeas();
}

function retrieveIdeas() {
  $(".idea-card").remove();
  for(var key in localStorage) {
    var parsed = JSON.parse(localStorage[key]);
    console.log(parsed);
    displayIdea(parsed);
  }
}

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
