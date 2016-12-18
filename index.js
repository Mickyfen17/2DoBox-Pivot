function grabValues() {
  var title = $( ".title" ).val();
  var idea = $( ".idea" ).val();
  console.log(idea + " " + title);
  // var createIdea = new CreateIdea(title, idea);
  // ideaContent(createIdea);
}
$( ".save" ).on("click",function() {
  grabValues();

});
