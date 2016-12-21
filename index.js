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
  enableSaveBtn();
});

//keyup event listener for title and idea inputs
$(".title, .idea").on("keyup", function() {
  enableSaveBtn();
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
function updateStoredQuality(voteButton, newQuality) {
  var id = $(voteButton).parent().attr("id");
  var itemsToEdit = JSON.parse(localStorage.getItem(id));
  itemsToEdit.quality = newQuality.text();
  localStorage.setItem(id, JSON.stringify(itemsToEdit));
}

//event listener to edit title and update title value in local storage
$(".entries").on("blur", "h5", function() {
  editIdeas(this, "title");
});

//event listener to edit body and update body value in local storage
$(".entries").on("blur", "p", function() {
  editIdeas(this, "body");
});

//function to edit content of title and body
function editIdeas(item, content) {
  var id = $(item).parent().attr("id");
  var updatedIdea = item.innerText;
  var itemsToEdit = JSON.parse(localStorage.getItem(id));
  itemsToEdit[content] = updatedIdea;
  localStorage.setItem(id, JSON.stringify(itemsToEdit));
}

//Function to enable and disable save button
function enableSaveBtn() {
  var title = $(".title").val();
  var idea = $(".idea").val();
  var saveBtn = $(".save");
  title.length > 0 && idea.length > 0 ? saveBtn.attr('disabled', false) : saveBtn.attr('disabled', true)
}

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
    displayIdea(parsed);
  }
}

//displays parsed Ideas to DOM//
function displayIdea(newIdeaContent) {
  $(".entries").prepend(`
    <article id="${newIdeaContent.id}" class="idea-card">
      <h5 class="edit" contenteditable>${newIdeaContent.title}</h5>
      <div class="delete"></div>
      <p class="edit" contenteditable>${newIdeaContent.body}</p>
      <div class="upvote"></div>
      <div class="downvote"></div>
      <h6>quality:<h5 class="quality">${newIdeaContent.quality}</h5></h6>
    </article>`
  );
}

//Search function to toggle display of idea cards
$(".search-input").on("keyup", function() {
  var ideas = $(".idea-card");
  var searchText = $(this).val().toLowerCase();
  ideas.each(function(i, idea) {
    var ideaText = $(idea).text().toLowerCase();
    var matched = ideaText.indexOf(searchText) !== -1;
    $(idea).toggle(matched);
  });
});
