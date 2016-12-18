var uniqueID;

window.onload = function() {
  retrieveIdeas();
};

$(".save").on("click", function() {
  uniqueID = Date.now();
  grabValues();
});

$(".entries").on("click", ".delete", function() {
  console.log(this);
  $(this).parent().remove();
});

function NewIdea(title, body) {
  // this.id = id;
  this.title = title;
  this.body = body;
  this.quality = "swill";
}

function grabValues() {
  var title = $( ".title" ).val();
  var idea = $( ".idea" ).val();
  var newIdea = new NewIdea(title, idea);
  // console.log(newIdea);
  stringObj(newIdea);
}

function stringObj(ideaObj) {
  var stringObj = JSON.stringify(ideaObj);
  localStorage.setItem(uniqueID, stringObj);
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
    <article class="idea-card">
    <h5>${newIdeaContent.title}</h5>
    <img class="delete" src="images/delete.svg">
    <p>${newIdeaContent.body}</p>
    <h6>${newIdeaContent.quality}</h6>
    </article>`
  );
}
