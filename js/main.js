// header 

const header = document.querySelector('.header')

window.addEventListener('scroll', function () {
  if (window.pageYOffset >= header.clientHeight * 0.9)
    header.classList.add('header_fixed')
  else
    header.classList.remove('header_fixed')

})
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
const toNocodeBtns = document.querySelectorAll('.js-toNocode')
const modalNocode = document.querySelector('.modal-nocode')
const toSupportBtns = document.querySelectorAll('.js-toSupport')
const modalSupport = document.querySelector('.modal-support')
const notifyBtns = document.querySelectorAll('.modal-notify-btn')


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