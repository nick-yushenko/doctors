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
  $('.select__head').removeClass('error');
  $('.select__list').fadeOut(5);

  const selectInput = this.parentElement.parentElement.querySelector('.select__head').querySelector('input')
  if (selectInput) {
    // selectInput.value = this.textContent
    selectInput.setAttribute('value', this.textContent)
    selectInput.setAttribute.value = this.textContent
    selectInput.classList.remove('invalid')
    if (selectInput.parentElement.querySelector('div.invalid'))
      selectInput.parentElement.querySelector('div.invalid').remove()
  } else {
    console.log('ERROR: в теле выпадающего списка отсутвует поле выбора элемента')
  }


  // выбор даты рождения 
  const BDinput = document.querySelector('.js-Birthday')
  const BDday = document.querySelector('.js-BDday')
  const BDmonth = document.querySelector('.js-BDmonth')
  const BDyear = document.querySelector('.js-BDyear')
  const BDerror = BDinput.parentElement.querySelector('div.invalid')

  if (BDinput) {
    if (this.classList.contains('js-BDday')) {
      BDinput.setAttribute('data-day', this.textContent)
      BDday.classList.remove('invalid')
      BDerror.style.display = 'none'

      if (BDmonth.value == '') {
        BDmonth.classList.add('invalid')
        BDerror.style.display = 'block'
        console.log('day - month')

      }
      if (BDyear.value == '') {
        BDyear.classList.add('invalid')
        BDerror.style.display = 'block'
        console.log('day - yaer')

      }

    }
    if (this.classList.contains('js-BDmonth')) {
      BDinput.setAttribute('data-month', this.getAttribute('data-value'))
      BDmonth.classList.remove('indalid')
      BDerror.style.display = 'none'

      if (BDday.value == '') {
        BDday.classList.add('invalid')
        BDerror.style.display = 'block'
        console.log('month day')

      }
      if (BDyear.value == '') {
        BDyear.classList.add('invalid')
        BDerror.style.display = 'block'
        console.log('month - year')


      }

    }
    if (this.parentElement.classList.contains('js-BDyear')) {
      BDinput.setAttribute('data-year', this.textContent)
      BDyear.classList.remove('invalid')
      
      BDerror.style.display = 'none'

      if (BDday.value == '') {
        BDday.classList.add('invalid')
        BDerror.style.display = 'block'
        console.log('year - day')


      }
      if (BDmonth.value == '') {
        BDmonth.classList.add('invalid')
        BDerror.style.display = 'block'

        console.log('year - month')

      }

    }


    // проверяем, все ли значения заполнены 
    if (BDinput.getAttribute('data-day') != '' && BDinput.getAttribute('data-month') != '' && BDinput.getAttribute('data-year') != '') {
      let date = BDinput.getAttribute('data-day').replace(' ', '') + '-' + BDinput.getAttribute('data-month').replace(' ', '') + '-' + BDinput.getAttribute('data-year').replace(' ', '')
      BDinput.setAttribute('value', date)
      BDerror.style.display = 'none'
      console.log(BDerror)
      
    }
  }

}

document.querySelectorAll('.select input').forEach(input => {


  input.addEventListener('input', function (e) {

    let str = /[^A-Za-zА-Яа-яЁё]/g
    input.value = input.value.replace(str, '')
    var request = input.value.toUpperCase()

    var listWrap = input.parentElement.nextElementSibling
    console.log(listWrap)
    var results = listWrap.querySelectorAll('.select__item')

    
    var elemToShow = 0;
    results.forEach(item => {
      var userName = item.textContent.toUpperCase();
      var dataSearch = ''
      if (item.hasAttribute('data-search')) {
        dataSearch = item.getAttribute('data-search').toUpperCase()
      }
      console.log(item)
      console.log(dataSearch)
      if (userName.includes(request) || request.includes(userName)) {

        item.style.display = 'block'

        elemToShow++

      } else if (dataSearch != '' && (dataSearch.includes(request) || request.includes(dataSearch))) {
        item.style.display = 'block'

        elemToShow++
      } else {
        item.style.display = 'none'

      }

      if (elemToShow == 0) {
        listWrap.querySelector('.empty').style.display = 'block'
      } else {
        listWrap.querySelector('.empty').style.display = 'none'

      }
    })
  })

})

$(document).click(function (e) {
  if (!$(e.target).closest('.select').length) {
    $('.select__head').removeClass('open');
    $('.select__list').fadeOut(5);
  }
});