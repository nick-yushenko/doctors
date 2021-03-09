// header 

const header = document.querySelector('.header')

window.addEventListener('scroll', function () {
  if (window.pageYOffset >= header.clientHeight * 0.9)
    header.classList.add('header_fixed')
  else
    header.classList.remove('header_fixed')

})

// открытие меню 
const openMenuMini = document.querySelector('.js-toggleHeaderMenu')
const menuMini = document.querySelector('.js-headerMenu')

if (openMenuMini && menuMini)
  openMenuMini.addEventListener('click', function (e) {
    menuMini.classList.toggle('active')
  })

$(document).click(function (e) {
  if (!$(e.target).closest('.js-headerMenu').length) {
    // клик вне элемента 
    if ($(e.target).closest('.js-toggleHeaderMenu').length) {
      // клик на кнопку октрытия меню
    } else {
      if (menuMini)
        menuMini.classList.remove('active')

    }

  }
});

// смена города 
const modals = document.querySelectorAll('.modal')

const toChooseCityBtns = document.querySelectorAll('.js-toChooseCity')
const modalCity = document.querySelector('.modal-city')
const toLoginBtns = document.querySelectorAll('.js-toLogin')
const modalLogin = document.querySelector('.modal-login')
const toResetBtns = document.querySelectorAll('.js-toReset')
const modalReset = document.querySelector('.modal-reset')
const toRegisterBtns = document.querySelectorAll('.js-toRegister')
const modalCode = document.querySelector('.modal-code')
const closeNocodeBtn = document.querySelector('.modal-nocode-close')
const closeSavedBtn = document.querySelector('.modal-saved-close')
const closeSetavatarBtn = document.querySelector('.modal-setavatar-close')
const toNocodeBtns = document.querySelectorAll('.js-toNocode')
const modalNocode = document.querySelector('.modal-nocode')
const toSupportBtns = document.querySelectorAll('.js-toSupport')
const modalSupport = document.querySelector('.modal-support')
const notifyBtns = document.querySelectorAll('.modal-notify-btn')
const modalRecommend = document.querySelector('.modal-recommend')
const toRecommendBtns = document.querySelectorAll('.js-toRecommend')
const modalComplain = document.querySelector('.modal-complain')
const toComplainBtns = document.querySelectorAll('.js-toComplain')

const closeModal = document.querySelectorAll('.modal-close')

if (toChooseCityBtns) {
  toChooseCityBtns.forEach(function (item) {

    item.addEventListener('click', function () {
      modals.forEach(function (item) {
        item.classList.remove('active')
      })
      modalCity.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'
    })
  })
}
if (toLoginBtns) {
  toLoginBtns.forEach(function (item) {

    item.addEventListener('click', function () {
      modals.forEach(function (item) {
        item.classList.remove('active')
      })
      modalLogin.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'

    })
  })
}
if (toResetBtns) {
  toResetBtns.forEach(function (item) {

    item.addEventListener('click', function () {
      modals.forEach(function (item) {
        item.classList.remove('active')
      })
      modalReset.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'

    })
  })
}
if (toRegisterBtns) {
  toRegisterBtns.forEach(function (item) {

    item.addEventListener('click', function () {
      modals.forEach(function (item) {
        item.classList.remove('active')
      })
      modalCode.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'

    })
  })
}
if (closeNocodeBtn) {
  closeNocodeBtn.addEventListener('click', function () {
    modals.forEach(function (item) {
      item.classList.remove('active')
    })
    document.querySelector('body').style.overflow = 'auto'

  })
}
if (closeSavedBtn) {
  closeSavedBtn.addEventListener('click', function () {
    modals.forEach(function (item) {
      item.classList.remove('active')
    })
    document.querySelector('body').style.overflow = 'auto'

  })
}
if (closeSetavatarBtn) {
  closeSetavatarBtn.addEventListener('click', function () {
    modals.forEach(function (item) {
      item.classList.remove('active')
    })
    document.querySelector('body').style.overflow = 'auto'

  })
}

if (toNocodeBtns) {
  toNocodeBtns.forEach(function (item) {

    item.addEventListener('click', function () {
      modals.forEach(function (item) {
        item.classList.remove('active')
      })
      modalNocode.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'

    })
  })
}
if (toSupportBtns) {
  toSupportBtns.forEach(function (item) {

    item.addEventListener('click', function () {
      modals.forEach(function (item) {
        item.classList.remove('active')
      })
      modalSupport.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'
      if (item.classList.contains('js-supportEmpty')) {
        modalSupport.querySelector('.modal-back').style.display = 'none'
      } else {
        modalSupport.querySelector('.modal-back').style.display = 'block'

      }
    })
  })
}
if (notifyBtns) {
  notifyBtns.forEach(function (close) {
    close.addEventListener('click', function () {
      modals.forEach(function (item) {
        item.classList.remove('active')
      })
      document.querySelector('body').style.overflow = 'auto'


    })
  })
}
if (toRecommendBtns) {
  toRecommendBtns.forEach(function (item) {

    item.addEventListener('click', function () {
      modals.forEach(function (item) {
        item.classList.remove('active')
      })
      modalRecommend.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'

    })
  })
}
if (toComplainBtns) {
  toComplainBtns.forEach(function (item) {

    item.addEventListener('click', function () {
      modals.forEach(function (item) {
        item.classList.remove('active')
      })
      modalComplain.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'

    })
  })
}


if (closeModal) {
  if (modals.length > 0)
    closeModal.forEach(function (close) {
      close.addEventListener('click', function () {
        modals.forEach(function (item) {
          item.classList.remove('active')
        })
        document.querySelector('body').style.overflow = 'auto'

      })
    })
}

// Подстановка выбранного города в Input. после выбора модальное окное закрывается. 
function chooseCity(e) {
  const cityField = document.querySelector('#modalCitySearchField')
  if (cityField) {
    // подстановка 
    cityField.setAttribute('value', e.target.textContent)
    e.target.parentElement.querySelector('.current').classList.remove('current')
    e.target.classList.add('current')
    // закрытие 
    modalCity.classList.remove('active')
    document.querySelector('body').style.overflow = 'auto'
  }
}


// Показать пароль 
const hidePasswordBtns = document.querySelectorAll('.input-block__hidepassword-icon')

if (hidePasswordBtns) {
  hidePasswordBtns.forEach(function (item) {
    item.addEventListener('click', function (e) {

      let input = item.parentElement.parentElement.querySelector('input')

      if (input.getAttribute('type') == 'text')
        input.setAttribute('type', 'password')
      else
        input.setAttribute('type', 'text')


      item.parentElement.querySelectorAll('img').forEach(function (icon) {
        icon.classList.toggle('active')
      })




    })
  })
}



// выпадающие списки 

const selects = document.querySelectorAll('.select')

if (selects.length > 0) {
  selects.forEach(function (item) {
    // item.querySelector('.js-select-trigger').addEventListener('click', openSelect(item))
    item.addEventListener('click', function () {
      item.classList.toggle('opened')
    })

    item.querySelectorAll('.select-item').forEach(function (elem) {
      elem.addEventListener('click', function () {
        item.classList.remove('opened')

      })
    })

  })
}



// Открытие фильтров 

const toggleFilterBtns = document.querySelectorAll('.close-filter')

if (toggleFilterBtns.length > 0) {
  toggleFilterBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      let parentItem
      if (e.target.tagName == "IMG")
        parentItem = e.target.parentElement.parentElement
      else
        parentItem = e.target.parentElement
      parentItem.classList.toggle('opened')
    })
  })
}



// Меню на странице профиля
let headerHeight = document.querySelector('.header').clientHeight
// console.log(headerHeight)
const menuItems = document.querySelectorAll('.profile-nav__item a')
if (menuItems)
  menuItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      // e.preventDefault();

      if (!item.parentElement.classList.contains('current')) {
        // item.parentElement.classList.add('current')
        item.parentElement.parentElement.querySelector('.current').classList.remove('current')
        item.parentElement.classList.add('current')
      }
    })
  })

const anchors = document.querySelectorAll('a[href*="#"]')
if (anchors)
  anchors.forEach(function (item) {
    item.addEventListener('click', function () {
      let blockID = item.getAttribute('href').substring(1)

      $("html, body").animate({
        scrollTop: $('#' + blockID).offset().top - headerHeight - 10 + "px"
      }, {
        duration: 500,
        easing: "swing"
      });
    })
  })

// Функции для droplist
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

  $('.select__head').removeClass('open');
  $('.select__list').fadeOut(5);

  this.parentElement.parentElement.querySelector('.select__head input').setAttribute('value', this.textContent)
  this.parentElement.parentElement.querySelector('.select__input').setAttribute('value', this.textContent)
}
// --- Добавление информации --- 

// Смена типо образования
const middleEducationRadio = document.querySelector('.js-MiddleEducationRadio')
const highEducationRadio = document.querySelector('.js-HighEducationRadio')
const highEducationBlock = document.querySelector('.js-highEducation')

if (middleEducationRadio && highEducationRadio) {
  middleEducationRadio.addEventListener('click', function (e) {
    highEducationBlock.style.display = 'none'
  })
  highEducationRadio.addEventListener('click', function (e) {
    highEducationBlock.style.display = 'block'

  })
}

//  диактивация выбора даты окончания работы 
const finishJobCheckbox = document.querySelector('.js-finishJob-checkbox')
const finishJobs = document.querySelectorAll('.js-finishJob')

if (finishJobCheckbox && finishJobs.length > 0)
  finishJobCheckbox.addEventListener('change', function () {
    finishJobs.forEach(function (item) {
      if (!item.parentElement.parentElement.parentElement.classList.contains('example')) {
        if (item.classList.contains('disable'))
          item.classList.remove('disable')
        else
          item.classList.add('disable')
      }
    })
  })

// добавление новой специяльности 
const addSpecialityBtns = document.querySelectorAll('.js-addSpeciality')
if (addSpecialityBtns.length > 0) {
  addSpecialityBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const example = document.querySelector('#specialityExample')
      const clone = example.cloneNode(true)
      clone.classList.remove('example')
      clone.removeAttribute('id')
      example.parentElement.append(clone)

      // установка слушателей на дропдауны
      $(clone.querySelectorAll('.select')).on('focus', '.select__head', onSelectFocus)
      $(clone.querySelectorAll('.select')).on('click', '.select__item', droplistChooseItem)
      $(clone.querySelectorAll('.select select__head input')).on('focus', onInputFocus)

      const deleteBtn = clone.querySelector('.js-removeSpeciality')
      deleteBtn.addEventListener('click', function (e) {
        clone.remove()
      })

    })
  })
}
// добавление еще 1 еста работы 
const addJobBtns = document.querySelectorAll('.js-addJob')

if (addJobBtns.length > 0) {
  addJobBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const example = document.querySelector('#jobExample')
      const clone = example.cloneNode(true)
      clone.classList.remove('example')
      clone.removeAttribute('id')
      example.parentElement.append(clone)

      const deleteBtn = clone.querySelector('.js-removeJob')
      deleteBtn.addEventListener('click', function (e) {
        clone.remove()
      })


      const addJobSpeciality = clone.querySelector('.js-addJobSpeciality')

      addJobSpeciality.addEventListener('click', function (e) {
        const jobSpecialityExample = e.target.parentElement.querySelector('.example')
        const jobSpecialityClone = jobSpecialityExample.cloneNode(true)
        jobSpecialityClone.classList.remove('example')
        jobSpecialityExample.parentElement.append(jobSpecialityClone)
      })

      const clone_finishJobCheckbox = clone.querySelector('.js-finishJob-checkbox')
      const clone_finishJobs = clone.querySelectorAll('.js-finishJob')

      if (clone_finishJobCheckbox && clone_finishJobs.length > 0)
        clone_finishJobCheckbox.addEventListener('change', function () {
          clone_finishJobs.forEach(function (item) {
            if (item.classList.contains('disable'))
              item.classList.remove('disable')
            else
              item.classList.add('disable')

          })
        })


    })
  })
}

// добавление специальности в место работы (1ое, которое всегда показывается)
const addJobSpecialityTemp = document.querySelector('#addJobSpecialityTemp')
if (addJobSpecialityTemp)
  addJobSpecialityTemp.addEventListener('click', function (e) {
    const jobSpecialityExample = e.target.parentElement.querySelector('.example')
    const jobSpecialityClone = jobSpecialityExample.cloneNode(true)
    jobSpecialityClone.classList.remove('example')
    jobSpecialityExample.parentElement.append(jobSpecialityClone)
  })

// добавление еще 1 места приема 
const addAppoinmentBtns = document.querySelectorAll('.js-addAppointment ')
if (addAppoinmentBtns.length > 0) {
  addAppoinmentBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const example = document.querySelector('#apointmentExample')
      const clone = example.cloneNode(true)
      clone.classList.remove('example')
      clone.removeAttribute('id')
      example.parentElement.append(clone)

      const deleteBtn = clone.querySelector('.js-removeApointment')
      deleteBtn.addEventListener('click', function (e) {
        clone.remove()
      })

      // установка слушателей на дропдауны
      $(clone.querySelectorAll('.select')).on('focus', '.select__head', onSelectFocus)
      $(clone.querySelectorAll('.select')).on('click', '.select__item', droplistChooseItem)
      $(clone.querySelectorAll('.select select__head input')).on('focus', onInputFocus)


      // добавление новой позиции в список улуг
      const addPriceItem = clone.querySelector('.js-addPriceItem')
      addPriceItem.addEventListener('click', function (e) {

        const priceItemExample = e.target.parentElement.querySelector('#priceItemExample')
        const priceItemClone = priceItemExample.cloneNode(true)
        priceItemClone.classList.remove('example')
        priceItemClone.removeAttribute('id')
        priceItemExample.parentElement.append(priceItemClone)
        // установка слушателей на дропдауны
        $(priceItemClone.querySelectorAll('.select')).on('focus', '.select__head', onSelectFocus)
        $(priceItemClone.querySelectorAll('.select')).on('click', '.select__item', droplistChooseItem)
        $(priceItemClone.querySelectorAll('.select select__head input')).on('focus', onInputFocus)
        // удаление позиции из списка услуг
        const deletePrice = priceItemClone.querySelector('.settings-price__delete')
        deletePrice.addEventListener('click', function (e) {
          priceItemClone.remove()
        })
      })
      const addPhone = clone.querySelector('.js-addPhone')
      addPhone.addEventListener('click', function (e) {

        const addPhoneExample = e.target.parentElement.querySelector('#phoneExample')
        const addPhoneClone = addPhoneExample.cloneNode(true)
        addPhoneClone.classList.remove('example')
        addPhoneClone.removeAttribute('id')
        addPhoneExample.parentElement.append(addPhoneClone)

        const removePhone = addPhoneClone.querySelector('.settings-phone__delete')
        removePhone.addEventListener('click', function (e) {
          addPhoneClone.remove()
        })
      })
    })
  })
}

// добавление позиции услуги в приеме (1ое, которое всегда показывается)
const addPriceItemTemp = document.querySelector('#addPriceItemTemp')
if (addPriceItemTemp)
  addPriceItemTemp.addEventListener('click', function (e) {
    const priceItemExample = e.target.parentElement.querySelector('.example')
    const priceItemClone = priceItemExample.cloneNode(true)
    priceItemClone.classList.remove('example')
    priceItemExample.parentElement.append(priceItemClone)
    // установка слушателей на дропдауны
    $(priceItemClone.querySelectorAll('.select')).on('focus', '.select__head', onSelectFocus)
    $(priceItemClone.querySelectorAll('.select')).on('click', '.select__item', droplistChooseItem)
    $(priceItemClone.querySelectorAll('.select select__head input')).on('focus', onInputFocus)
    const deletePriceTemp = priceItemClone.querySelector('.settings-price__delete')
    deletePriceTemp.addEventListener('click', function (e) {
      priceItemClone.remove()
    })
  })
// добавление телефона клиники в приеме (1ое, которое всегда показывается)

const addPhoneTemp = document.querySelector('#addPhoneTemp')
if (addPhoneTemp)
  addPhoneTemp.addEventListener('click', function (e) {
    const phoneTempExample = e.target.parentElement.querySelector('.example')
    const phoneTempClone = phoneTempExample.cloneNode(true)
    phoneTempClone.classList.remove('example')
    phoneTempExample.parentElement.append(phoneTempClone)

    const removePhoneTemp = phoneTempClone.querySelector('.settings-phone__delete')
    removePhoneTemp.addEventListener('click', function (e) {
      phoneTempClone.remove()
    })
  })


// редактирование внешнего вида 

const view = document.querySelector('#viewBg')
const bgBtn0 = document.querySelector('.js-setBg0')
const bgBtn1 = document.querySelector('.js-setBg1')
const bgBtn2 = document.querySelector('.js-setBg2')
const bgBtn3 = document.querySelector('.js-setBg3')
const sectionNav = document.querySelector('.section-nav')
const sectionTitile = document.querySelector('.section-title')
if (view && bgBtn0 && bgBtn1 && bgBtn2 && bgBtn3 && sectionNav && sectionTitile) {
  bgBtn0.addEventListener('change', function (e) {
    view.classList.add('bg-0')
    view.classList.remove('bg-1')
    view.classList.remove('bg-2')
    view.classList.remove('bg-3')
    sectionNav.querySelectorAll('a').forEach(function (item) {
      item.style.color = '#929FB1'
    })
    sectionNav.querySelectorAll('img').forEach(function (item) {
      let value = item.getAttribute('src')
      let src = value.substr(0, value.lastIndexOf('/') + 1) + 'arrow-icon.svg'
      item.setAttribute('src', src)
    })

    sectionTitile.style.color = "#182744"

    sectionTitile.querySelector('img').setAttribute('src', sectionTitile.querySelector('img').getAttribute('src').substr(0, sectionTitile.querySelector('img').getAttribute('src').lastIndexOf('/') + 1) + 'back-icon_black.svg')



  })
  bgBtn1.addEventListener('change', function (e) {
    view.classList.add('bg-1')
    view.classList.remove('bg-0')
    view.classList.remove('bg-2')
    view.classList.remove('bg-3')

    sectionNav.querySelectorAll('a').forEach(function (item) {
      item.style.color = '#ffffff'
    })
    sectionNav.querySelectorAll('img').forEach(function (item) {
      let value = item.getAttribute('src')
      let src = value.substr(0, value.lastIndexOf('/') + 1) + 'arrow-icon_1.svg'
      item.setAttribute('src', src)
    })
    sectionTitile.style.color = "#ffffff"

    sectionTitile.querySelector('img').setAttribute('src', sectionTitile.querySelector('img').getAttribute('src').substr(0, sectionTitile.querySelector('img').getAttribute('src').lastIndexOf('/') + 1) + 'back-icon_white.svg')



  })
  bgBtn2.addEventListener('change', function (e) {
    view.classList.add('bg-2')
    view.classList.remove('bg-0')
    view.classList.remove('bg-1')
    view.classList.remove('bg-3')
    sectionNav.querySelectorAll('a').forEach(function (item) {
      item.style.color = '#929FB1'
    })
    sectionNav.querySelectorAll('img').forEach(function (item) {
      let value = item.getAttribute('src')
      let src = value.substr(0, value.lastIndexOf('/') + 1) + 'arrow-icon.svg'
      item.setAttribute('src', src)

    })
    sectionTitile.style.color = "#182744"

    sectionTitile.querySelector('img').setAttribute('src', sectionTitile.querySelector('img').getAttribute('src').substr(0, sectionTitile.querySelector('img').getAttribute('src').lastIndexOf('/') + 1) + 'back-icon_black.svg')

  })
  bgBtn3.addEventListener('change', function (e) {
    view.classList.add('bg-3')
    view.classList.remove('bg-0')
    view.classList.remove('bg-1')
    view.classList.remove('bg-2')

    sectionNav.querySelectorAll('a').forEach(function (item) {
      item.style.color = '#182744'
    })
    sectionNav.querySelectorAll('img').forEach(function (item) {
      let value = item.getAttribute('src')
      let src = value.substr(0, value.lastIndexOf('/') + 1) + 'arrow-icon_3.svg'
      item.setAttribute('src', src)

    })
    sectionTitile.style.color = "#182744"
    sectionTitile.querySelector('img').setAttribute('src', sectionTitile.querySelector('img').getAttribute('src').substr(0, sectionTitile.querySelector('img').getAttribute('src').lastIndexOf('/') + 1) + 'back-icon_black.svg')

  })
}


// заполнение первой формы регистрации (ввода кода). 
// Введенный код перезаписывается в отдельное поле, на которое накладывается валидация  

const codeFields = document.querySelectorAll('.code-field')
const codeTrueField = document.querySelector('.js-codeTrue')
const sendCode = document.querySelector('.js-sendCode')
const codeForm = document.querySelector('#RegistrationCode')

if (codeForm && sendCode && codeFields.length > 0 && codeTrueField) {

  let codeArray = ["", "", "", ""]
  let codeCounter = 0
  let code = ""
  // символьный класс содержащий только цифры (далее будут удалены все символы из строки, кроме этих символов)
  const codeFormat = /[^\d]/g;

  for (let i = 0; i < codeFields.length; i++) {

    codeFields[i].addEventListener('input', function (e) {
      // маска для поле
      codeFields[i].value = codeFields[i].value.replace(codeFormat, '')

      codeArray[i - 1] = codeFields[i].value

      codeCounter = codeFields[0].value.length + codeFields[1].value.length + codeFields[2].value.length + codeFields[3].value.length
      if (codeCounter == 16) {
        code = codeFields[0].value + codeFields[1].value + codeFields[2].value + codeFields[3].value
        codeTrueField.value = code
        sendCode.classList.remove('disabled')
      } else
        sendCode.classList.add('disabled')







      // переход к следующему полю, если это заполнено
      if (codeFields[i].value.length == 4 && i < codeFields.length - 1) {
        codeFields[i + 1].focus()

      }

      // если заполнено последнее поле
      if (codeFields[i].value.length == 4 && i == codeFields.length) {
        sendCode.focus()
      }

      // переход к предыдущему полю, если это очищено
      if (codeFields[i].value.length == 0 && i > 0)
        codeFields[i - 1].focus()
    })
  }


  codeForm.addEventListener('submit', function (e) {
    if (sendCode.classList.contains('disabled'))
      e.preventDefault()
    // alert('no')
  })

}
// Валидация форм

// валидация номеров телефона
$('input.phone').mask('(000) 000-00-00')


$('#supportForm').validate({

  rules: {
    email: {
      required: true,
      email: true
    },
    userName: {
      required: true
    },
    theme: {
      required: true
    },
    message: {
      required: true
    },

  },
  messages: {
    email: {
      required: jQuery.validator.format('Поле не заполнено'),
      email: jQuery.validator.format('Введен некорректный e-mail')
    },
    userName: {
      required: jQuery.validator.format("Поле не заполнено")
    },
    theme: {
      required: jQuery.validator.format("Поле не заполнено")
    },
    message: {
      required: jQuery.validator.format("Поле не заполнено")
    }
  },
  errorElement: "div",
  errorClass: "invalid",

});

$('#loginForm').validate({

  rules: {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true
    },


  },
  messages: {
    email: {
      required: jQuery.validator.format('Поле не заполнено'),
      email: jQuery.validator.format('Введен некорректный e-mail')
    },
    password: {
      required: jQuery.validator.format("Поле не заполнено")
    },

  },
  errorElement: "div",
  errorClass: "invalid",

});
$('#registerForm').validate({

  rules: {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true
    },
    confirmPassword: {
      required: true
    },

  },
  messages: {
    email: {
      required: jQuery.validator.format('Поле не заполнено'),
      email: jQuery.validator.format('Введен некорректный e-mail')
    },
    password: {
      required: jQuery.validator.format("Поле не заполнено")
    },
    confirmPassword: {
      required: jQuery.validator.format("Поле не заполнено")
    },

  },
  errorElement: "div",
  errorClass: "invalid",

});

$('#resetPasswordForm').validate({

  rules: {
    email: {
      required: true,
      email: true
    },



  },
  messages: {
    email: {
      required: jQuery.validator.format('Поле не заполнено'),
      email: jQuery.validator.format('Введен некорректный e-mail')
    }
  },
  errorElement: "div",
  errorClass: "invalid",

});

$('#complainForm').validate({

  rules: {
    message: {
      required: true,
    },

    mistake: {
      required: true,
    },


  },
  messages: {
    message: {
      required: jQuery.validator.format('Поле не заполнено'),
    },
    mistake: {
      required: jQuery.validator.format('Поле не заполнено'),
    }
  },
  errorElement: "div",
  errorClass: "invalid",

});
$('#inviteModalForm').validate({

  rules: {
    phone: {
      required: true,

    },

  },
  messages: {
    phone: {
      required: jQuery.validator.format('Поле не заполнено'),
      minlength: jQuery.validator.format("Номер указан не полностью")
    },
  },
  errorElement: "div",
  errorClass: "invalid",

});
$('#inviteForm').validate({

  rules: {
    phone: {
      required: true,

    },

  },
  messages: {
    phone: {
      required: jQuery.validator.format('Поле не заполнено'),
      minlength: jQuery.validator.format("Номер указан не полностью")
    },
  },
  errorElement: "div",
  errorClass: "invalid",

});
$('#settingsChangeEmail').validate({

  rules: {
    email: {
      required: true,

    },

  },
  messages: {
    email: {
      required: jQuery.validator.format('Поле не заполнено'),
      email: jQuery.validator.format('Введен некорректный e-mail')
    },
  },
  errorElement: "div",
  errorClass: "invalid",

});

$('#settingsChangePassword').validate({

  rules: {
    confirmNewPassword: {
      required: true,
    },
    newPassword: {
      required: true
    },
    currentPassword: {
      required: true
    },


  },
  messages: {
    confirmNewPassword: {
      required: jQuery.validator.format('Поле не заполнено'),
    },
    newPassword: {
      required: jQuery.validator.format('Поле не заполнено'),
    },
    currentPassword: {
      required: jQuery.validator.format('Поле не заполнено'),
    },


  },
  errorElement: "div",
  errorClass: "invalid",

});
// активация / диактивация кнопки отправки формы 
function activateSubmit(form) {



  function onChangeField() {
    if (form != null) {

      if (this.classList.contains('field')) {
        if (this.getAttribute('type') == 'email') {
          if (this.value.length > 0 && this.value.indexOf('@') > -1)
            this.classList.add('success')
          else
            this.classList.remove('success')
        } else if (this.getAttribute('type') == 'phone') {
          if (this.value.length == 15)
            this.classList.add('success')
          else
            this.classList.remove('success')
        } else {
          if (this.value.length > 0)
            this.classList.add('success')
          else
            this.classList.remove('success')

        }

      } else {
        this.parentElement.parentElement.querySelector('.select__head input').classList.add('success')
      }

      checkForm()
    }

  }

  function checkForm() {
    if (form != null) {

      let successFieldsCount = form.querySelectorAll('.success').length
      if (successFieldsCount == fieldsCount) {
        console.log(successFieldsCount)
        console.log('ready')
        form.querySelector('input.form-submit').classList.remove('disabled')

      } else {
        form.querySelector('input.form-submit').classList.add('disabled')
      }
    }

  }
  // console.log('ERROR: не удалось установить слушатель валидации формы. Элемент не найден')


  const fields = (form == null) ? null : form.querySelectorAll('.field')

  let fieldsCount = (form == null) ? -1 : fields.length

  if (fields != null && fields.length > 0)
    fields.forEach(function (field) {

      if (field.parentElement.parentElement.classList.contains('select')) { // проверка дроплиста
        const selectItems = field.parentElement.parentElement.querySelectorAll('.select__item')
        selectItems.forEach(function (item) {
          item.addEventListener('click', onChangeField)
        })
      } else {
        console.log('input') // проверка обычного поля
        field.addEventListener('input', onChangeField)
      }

    })

}
if (document.querySelector('#supportForm'))
  activateSubmit(document.querySelector('#supportForm'))
if (document.querySelector('#loginForm'))
  activateSubmit(document.querySelector('#loginForm'))
if (document.querySelector('#resetPasswordForm'))
  activateSubmit(document.querySelector('#resetPasswordForm'))
if (document.querySelector('#complainForm'))
  activateSubmit(document.querySelector('#complainForm'))
if (document.querySelector('#registerForm'))
  activateSubmit(document.querySelector('#registerForm'))
if (document.querySelector('#inviteForm'))
  activateSubmit(document.querySelector('#inviteForm'))
if (document.querySelector('#inviteModalForm'))
  activateSubmit(document.querySelector('#inviteModalForm'))
if (document.querySelector('#settingsChangeEmail'))
  activateSubmit(document.querySelector('#settingsChangeEmail'))
if (document.querySelector('#settingsChangePassword'))
  activateSubmit(document.querySelector('#settingsChangePassword'))