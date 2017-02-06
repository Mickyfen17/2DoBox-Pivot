$('.filter-btn').on("click", function() {
  toggleToDoDisplay(this.id);
});

$(".reset-btn").on("click", () => {
  $(".todo-card").each((index, card) => {
    $(card).show();
  });
});

const toggleToDoDisplay = importance => {
  $(".todo-card").each((index, card) => {
    let cardQuality = $(card).find(".quality").text().toLowerCase();
    return cardQuality !== importance ? $(card).hide() : $(card).show();
  });
};
