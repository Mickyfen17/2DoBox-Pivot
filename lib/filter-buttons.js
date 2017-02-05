$('.filter-btn').on('click', function() {
  toggleToDoDisplay(this.id)
})

const toggleToDoDisplay = importance => {
  $('.todo-card').each((index, card) => {
    let cardQuality = $(card).find('.quality').text().toLowerCase()
    if(cardQuality !== importance) {
      $(card).addClass('displayToggleClass')
    } else {
      $(card).removeClass('displayToggleClass')
    }
  })
}
