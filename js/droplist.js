$('.select').on('focus', '.select__head', onSelectFocus);



$('.select__head input').on('focus', onInputFocus)

// Выбор элемента из списка
$('.select').on('click', '.select__item', droplistChooseItem);

function onSelectFocus() {
  // Отключить предыдущие 
  $('.select__head').removeClass('open');
  $('.select__list').fadeOut(5);
  // включить текущую 
  $(this).addClass('open');
  $(this).next().fadeIn(5);
}

function onInputFocus() {
  if (!this.parentElement.classList.contains('select__head')) {
    if ($('.select__head'))
      $('.select__head').removeClass('open');
    if ($('.select__list'))
      $('.select__list').fadeOut(5);
  }
}

function droplistChooseItem() {
  // $(this).parent().prev().text($(this).text());
  // let myInput = document.createElement('div')
  // myInput.classList.add('selected')

  $('.select__head').removeClass('open');
  $('.select__list').fadeOut(5);

  $('.select__head input').attr('placeholder', this.textContent)
  $('.select__head input').attr('value', this.textContent)

}
$(document).click(function (e) {
  if (!$(e.target).closest('.select').length) {
    $('.select__head').removeClass('open');
    $('.select__list').fadeOut(5);
  }
});