
function NewIdea(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = "swill";
}

function grabValues() {
  var title = $( ".title" ).val();
  var idea = $( ".idea" ).val();
  console.log(title + " " + idea);
  var newIdea = new NewIdea(1, title, idea);
  console.log(newIdea);
}


$( ".save" ).on("click",function() {
  grabValues();
});
