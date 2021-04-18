(function ($) { // <----- Начало обертки


  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
  if (!("nextElementSibling" in document.documentElement)) {
    Object.defineProperty(Element.prototype, "nextElementSibling", {
      get: function () {
        var e = this.nextSibling;
        while (e && 1 !== e.nodeType)
          e = e.nextSibling;
        return e;
      }
    });
  }

  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('append')) {
        return;
      }
      Object.defineProperty(item, 'append', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function append() {
          var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();

          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });

          this.appendChild(docFrag);
        }
      });
    });
  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);

  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }


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
      selectInput.value = this.textContent
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

    const BDerror = (BDinput) ? BDinput.parentElement.querySelector('div.invalid') : null

    if (BDinput && BDday && BDmonth && BDyear && BDerror) {
      if (this.classList.contains('js-BDday')) {
        BDinput.setAttribute('data-day', this.textContent)
        BDday.classList.remove('invalid')
        BDerror.style.display = 'none'

        if (BDmonth.value == '') {
          BDmonth.classList.add('invalid')
          BDerror.style.display = 'block'

        }
        if (BDyear.value == '') {
          BDyear.classList.add('invalid')
          BDerror.style.display = 'block'

        }

      }
      if (this.classList.contains('js-BDmonth')) {
        BDinput.setAttribute('data-month', this.getAttribute('data-value'))
        BDmonth.classList.remove('indalid')
        BDerror.style.display = 'none'

        if (BDday.value == '') {
          BDday.classList.add('invalid')
          BDerror.style.display = 'block'

        }
        if (BDyear.value == '') {
          BDyear.classList.add('invalid')
          BDerror.style.display = 'block'


        }

      }
      if (this.parentElement.classList.contains('js-BDyear')) {
        BDinput.setAttribute('data-year', this.textContent)
        BDyear.classList.remove('invalid')

        BDerror.style.display = 'none'

        if (BDday.value == '') {
          BDday.classList.add('invalid')
          BDerror.style.display = 'block'


        }
        if (BDmonth.value == '') {
          BDmonth.classList.add('invalid')
          BDerror.style.display = 'block'


        }

      }


      // проверяем, все ли значения заполнены 
      if (BDinput.getAttribute('data-day') != '' && BDinput.getAttribute('data-month') != '' && BDinput.getAttribute('data-year') != '') {
        let date = BDinput.getAttribute('data-day').replace(' ', '') + '-' + BDinput.getAttribute('data-month').replace(' ', '') + '-' + BDinput.getAttribute('data-year').replace(' ', '')
        BDinput.setAttribute('value', date)
        BDinput.value = date
        BDerror.style.display = 'none'

      }
    }

  }

  document.querySelectorAll('.select input').forEach(function (input) {


    input.addEventListener('input', function (e) {

      let str = /[^A-Za-zА-Яа-яЁё]/g
      input.value = input.value.replace(str, '')
      var request = input.value.toUpperCase()

      var listWrap = input.parentElement.nextElementSibling
      var results = listWrap.querySelectorAll('.select__item')


      var elemToShow = 0;
      results.forEach(function (item) {
        var userName = item.textContent.toUpperCase();
        var dataSearch = ''
        if (item.hasAttribute('data-search')) {
          dataSearch = item.getAttribute('data-search').toUpperCase()
        }
        // console.log(item)
        // console.log(dataSearch)
        if (userName.indexOf(request) != -1 || request.indexOf(userName) != -1) {

          item.style.display = 'block'

          elemToShow++

        } else if (dataSearch != '' && (dataSearch.indexOf(request) != -1 || request.indexOf(dataSearch) != -1)) {
          item.style.display = 'block'

          elemToShow++
        } else {
          item.style.display = 'none'

        }

        if (elemToShow == 0) {
          if (listWrap.querySelector('.empty'))
            listWrap.querySelector('.empty').style.display = 'block'
        } else {
          if (listWrap.querySelector('.empty'))
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

})(jQuery);