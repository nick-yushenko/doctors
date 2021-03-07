$('.select').on('focus', '.select__head', onSelectFocus);



$('.select__head input').on('focus', onInputFocus)

// Выбор элемента из списка
$('.select').on('click', '.select__item', droplistChooseItem);

function onSelectFocus() {
  if (!this.parentElement.classList.contains('disable')) { // Отключить предыдущие 
    $('.select__head').removeClass('open');
    $('.select__list').fadeOut(5);
    // включить текущую 
    $(this).addClass('open');
    $(this).next().fadeIn(5);
  }
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
  const doctorTheme = document.querySelector('.js-themeDoctor')
  const candidateTheme = document.querySelector('.js-themeCandidate')

  if (this.classList.contains('js-degreeDoctor') && candidateTheme && doctorTheme) {
    doctorTheme.style.display = 'flex'
    candidateTheme.style.display = 'flex'
  }
  if (this.classList.contains('js-degreeCandidate') && candidateTheme && doctorTheme) {
    doctorTheme.style.display = 'none'
    candidateTheme.style.display = 'flex'
  }
  if (this.classList.contains('js-degreeEmpty') && candidateTheme && doctorTheme) {
    doctorTheme.style.display = 'none'
    candidateTheme.style.display = 'none'
  }
  $('.select__head').removeClass('open');
  $('.select__list').fadeOut(5);

  this.parentElement.parentElement.querySelector('.select__head input').value = this.textContent
  this.parentElement.parentElement.querySelector('.select__input').value = this.textContent

}

$(document).click(function (e) {
  if (!$(e.target).closest('.select').length) {
    $('.select__head').removeClass('open');
    $('.select__list').fadeOut(5);
  }
});