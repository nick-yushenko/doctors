var isIE = /*@cc_on!@*/ false || !!document.documentMode;

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

// поиск города 

const searchInputs = document.querySelectorAll('.js-searchInput')

if (searchInputs) {
  searchInputs.forEach(function (input) {
    input.addEventListener('input', function (e) {
      var request = input.value.toUpperCase()

      var listWrap = document.querySelector('.' + input.getAttribute('data-listwrapclass'))
      var results = listWrap.querySelectorAll('.modal-city-item')

      var elemToShow = 0;
      results.forEach(function (item) {
        var city = item.textContent.toUpperCase();

        if (city.indexOf(request) != -1 || request.indexOf(city) != -1) {

          item.style.display = 'flex'

          elemToShow++
        } else {
          item.style.display = 'none'

        }

        if (elemToShow == 0) {
          listWrap.querySelector('.empty').style.display = 'flex'
        } else {
          listWrap.querySelector('.empty').style.display = 'none'

        }
      })
    })
  })


}

// адаптив высоты модальных окон 
document.querySelectorAll('.modal').forEach(function (item) {
  CheckModal(item)
})

function CheckModal(modal) {
  const wrapper = modal.querySelector('.modal-wrap')
  if (wrapper)
    if (wrapper.clientHeight + 50 >= window.innerHeight) {
      modal.style.alignItems = 'flex-start'
      wrapper.style.marginTop = '30px'
      wrapper.style.marginBottom = '30px'
    }
}
// header 

const header = document.querySelector('.header')
const sidebar = document.querySelector('.sidebar')
if (sidebar) {
  var sidebarTop = window.getComputedStyle(sidebar).getPropertyValue("top")
  sidebarTop = sidebarTop.replace('px', '')

}
window.addEventListener('scroll', function () {
  if (window.pageYOffset >= header.clientHeight * 0.9)
    header.classList.add('header_fixed')
  else
    header.classList.remove('header_fixed')

  if (sidebar) {
    if (sidebar.classList.contains('filter')) {
      if (window.innerWidth > 1024)
        if (window.pageYOffset < 26) {
          sidebar.style.top = sidebarTop - window.pageYOffset + 'px'
        } else {
          let headerHeight = document.querySelector('.header').clientHeight
          if (document.querySelector('.header-nav__wrap'))
            headerHeight += document.querySelector('.header-nav__wrap').clientHeight
          sidebar.style.top = headerHeight + 14 + 'px'
        }
    } else {
      if (window.pageYOffset < 26)
        sidebar.style.top = sidebarTop - window.pageYOffset + 'px'
      else {
        let headerHeight = document.querySelector('.header').clientHeight
        if (document.querySelector('.header-nav__wrap'))
          headerHeight += document.querySelector('.header-nav__wrap').clientHeight
        sidebar.style.top = headerHeight + 14 + 'px'
      }

    }

  }
})

// открытие меню 

const burger = document.querySelector('.burger')
const burgerSearch = document.querySelector('.burger-search')
const menu = document.querySelector('.menu')
const filter = document.querySelector('.filter')
const toFilter = document.querySelectorAll('.js-toFilter')
const menuSearch = document.querySelector('.menu-search')
const menuBg = document.querySelector('.menu-bg')
const closeFilter = document.querySelectorAll('.filter-close')
const toViewMenu = document.querySelector('.menu-view-toggle')
const viewMenu = document.querySelector('.menu-view')

if (burger && menu && menuBg) {
  burger.addEventListener('click', function (e) {
    menu.classList.toggle('active')
    menuBg.classList.toggle('active')
    if (viewMenu)
      viewMenu.style.zIndex = '180'
  })
  menu.querySelector('.menu-close').addEventListener('click', function (e) {
    menu.classList.toggle('active')
    menuBg.classList.toggle('active')
    if (viewMenu)
      viewMenu.style.zIndex = '200'

  })
}

if (viewMenu && toViewMenu) {
  toViewMenu.addEventListener('click', function (e) {
    viewMenu.classList.toggle('active')
    menuBg.classList.toggle('active')
  })

  if (window.innerWidth <= 1024) {
    document.querySelector('.footer').style.paddingBottom = "130px"
  }
  if (window.innerWidth <= 860) {
    document.querySelector('.footer').style.paddingBottom = "110px"
  }
  if (window.innerWidth <= 425) {
    document.querySelector('.footer').style.paddingBottom = "94px"
  }
  if (window.innerWidth > 1024) {
    document.querySelector('.footer').style.paddingBottom = window.getComputedStyle(document.querySelector('.footer')).paddingTop
  }

}
if (burgerSearch && menuBg && menuSearch) {
  burgerSearch.addEventListener('click', function (e) {
    menuSearch.classList.toggle('active')
    menuBg.classList.toggle('active')
  })

}

if (filter && toFilter) {
  toFilter.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      filter.classList.toggle('active')
      menuBg.classList.toggle('active')

    })
  })
  closeFilter.forEach(function (close) {
    close.addEventListener('click', function (e) {
      filter.classList.remove('active')
      menuBg.classList.remove('active')

    })
  })

}


if (menuBg)
  menuBg.addEventListener('click', function () {
    if (menu) {
      menu.classList.remove('active')
      menuBg.classList.remove('active')
    }
    if (menuSearch) {
      menuSearch.classList.remove('active')
      menuBg.classList.remove('active')
    }
    if (filter) {
      filter.classList.remove('active')
      menuBg.classList.remove('active')
    }
    if (viewMenu) {
      viewMenu.classList.remove('active')
      menuBg.classList.remove('active')
    }
    if (viewMenu)
      viewMenu.style.zIndex = '200'

  })

// открытие мини меню 
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
const modalDelete = document.querySelector('.modal-delete')
const toDeleteBtns = document.querySelectorAll('.js-toDeleteAccount')

const closeModal = document.querySelectorAll('.modal-close')
if (toDeleteBtns) {
  toDeleteBtns.forEach(function (item) {

    item.addEventListener('click', function () {
      modals.forEach(function (item) {
        item.classList.remove('active')
      })

      modalDelete.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'
      CheckModal(modalDelete)

    })
  })
}
if (toChooseCityBtns.length > 0) {
  toChooseCityBtns.forEach(function (item) {

    item.addEventListener('click', function () {
      modals.forEach(function (item) {
        item.classList.remove('active')
      })
      modalCity.classList.add('active')
      document.querySelector('body').style.overflow = 'hidden'
      const menu = document.querySelector('.menu')
      const menuBg = document.querySelector('.menu-bg')
      if (menuBg && menu) {
        menu.classList.remove('active')
        menuBg.classList.remove('active')
      }

      CheckModal(modalCity)
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
      const menu = document.querySelector('.menu')
      const menuBg = document.querySelector('.menu-bg')
      if (menuBg && menu) {
        menu.classList.remove('active')
        menuBg.classList.remove('active')

      }
      CheckModal(modalLogin)

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
      const menu = document.querySelector('.menu')
      const menuBg = document.querySelector('.menu-bg')
      if (menuBg && menu) {
        menu.classList.remove('active')
        menuBg.classList.remove('active')

      }
      CheckModal(modalReset)

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
      const menu = document.querySelector('.menu')
      const menuBg = document.querySelector('.menu-bg')
      if (menuBg && menu) {
        menu.classList.remove('active')
        menuBg.classList.remove('active')

      }
      CheckModal(modalCode)

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
      CheckModal(modalNocode)
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
      CheckModal(modalSupport)

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
      CheckModal(modalRecommend)

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
      CheckModal(modalComplain)

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
if (document.querySelector('.header-nav__wrap'))
  headerHeight += document.querySelector('.header-nav__wrap').clientHeight
const menuItems = document.querySelectorAll('.profile-nav__item a')
const headerNavItems = document.querySelectorAll('.header-nav__item a')

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
headerNavItems.forEach(function (item) {
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

const toggleeducation = document.querySelectorAll('.js-toggle-education')
if (toggleeducation) {
  toggleeducation.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      let parentItem
      if (e.target.tagName == "IMG")
        parentItem = e.target.parentElement.parentElement
      else
        parentItem = e.target.parentElement

      parentItem.classList.toggle('opened')
    })
  })
}
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

  // this.parentElement.parentElement.querySelector('.select__head input').setAttribute('value', this.textContent)
  this.parentElement.parentElement.querySelector('.select__head input').value = this.textContent
  this.parentElement.parentElement.querySelector('.select__input').value = this.textContent
}
// --- Добавление информации --- 

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

// добавление новой специальности 
const addSpecialityBtns = document.querySelectorAll('.js-addSpeciality')

if (addSpecialityBtns.length > 0) {
  addSpecialityBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const example = document.querySelector('#specialityExample')
      const clone = example.cloneNode(true)
      clone.classList.remove('example')
      clone.removeAttribute('id')
      example.parentElement.append(clone)
      // проверка количества блоков для добавления специальности
      let specialityCount = 0
      document.querySelectorAll('.speciality-item').forEach(function (item) {
        if (!item.classList.contains('example'))
          specialityCount++
      })
      if (specialityCount == 1) {
        // диактивировать кнопку удаления 
        document.querySelectorAll('.speciality-item').forEach(function (item) {
          if (!item.classList.contains('example'))
            item.querySelector('.js-removeSpeciality').style.display = 'none'
        })

      } else {

        document.querySelectorAll('.speciality-item').forEach(function (item) {
          if (!item.classList.contains('example'))
            item.querySelector('.js-removeSpeciality').style.display = 'block'
        })
      }

      // установка слушателей на дропдауны
      $(clone.querySelectorAll('.select')).on('focus', '.select__head', onSelectFocus)
      $(clone.querySelectorAll('.select')).on('click', '.select__item', droplistChooseItem)
      $(clone.querySelectorAll('.select select__head input')).on('focus', onInputFocus)

      const deleteBtn = clone.querySelector('.js-removeSpeciality')
      deleteBtn.addEventListener('click', function (e) {
        clone.remove()
        // проверка количества блоков для добавления специальности
        let specialityCount = 0
        document.querySelectorAll('.speciality-item').forEach(function (item) {
          if (!item.classList.contains('example'))
            specialityCount++
        })
        if (specialityCount == 1) {
          // диактивировать кнопку удаления 
          document.querySelectorAll('.speciality-item').forEach(function (item) {
            if (!item.classList.contains('example'))
              item.querySelector('.js-removeSpeciality').style.display = 'none'
          })

        } else {

          document.querySelectorAll('.speciality-item').forEach(function (item) {
            if (!item.classList.contains('example'))
              item.querySelector('.js-removeSpeciality').style.display = 'block'
          })
        }

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

      // установка слушателей на дропдауны
      $(clone.querySelectorAll('.select')).on('focus', '.select__head', onSelectFocus)
      $(clone.querySelectorAll('.select')).on('click', '.select__item', droplistChooseItem)
      $(clone.querySelectorAll('.select select__head input')).on('focus', onInputFocus)

      // проверка количества блоков для добавления специальности
      let jobCount = 0
      document.querySelectorAll('.settings-jobs__block').forEach(function (item) {
        if (!item.classList.contains('example'))
          jobCount++
      })
      if (jobCount == 1) {
        // диактивировать кнопку удаления 
        document.querySelectorAll('.settings-jobs__block').forEach(function (item) {
          if (!item.classList.contains('example'))
            item.querySelector('.js-removeJob').style.display = 'none'
        })

      } else {

        document.querySelectorAll('.settings-jobs__block').forEach(function (item) {
          if (!item.classList.contains('example'))
            item.querySelector('.js-removeJob').style.display = 'block'
        })
      }

      const deleteBtn = clone.querySelector('.js-removeJob')
      deleteBtn.addEventListener('click', function (e) {
        clone.remove()
        // проверка количества блоков для добавления специальности
        let jobCount = 0
        document.querySelectorAll('.settings-jobs__block').forEach(function (item) {
          if (!item.classList.contains('example'))
            jobCount++
        })
        if (jobCount == 1) {
          // диактивировать кнопку удаления 
          document.querySelectorAll('.settings-jobs__block').forEach(function (item) {
            if (!item.classList.contains('example'))
              item.querySelector('.js-removeJob').style.display = 'none'
          })

        } else {

          document.querySelectorAll('.settings-jobs__block').forEach(function (item) {
            if (!item.classList.contains('example'))
              item.querySelector('.js-removeJob').style.display = 'block'
          })
        }
      })


      // удаление специальности, которая задана по умолчанию 
      const removeJobSpecialityTemp = clone.querySelector('.js-removeJobspecialityTemp')
      removeJobSpecialityTemp.addEventListener('click', function () {
        removeJobSpecialityTemp.parentElement.remove()

      })

      const addJobSpeciality = clone.querySelector('.js-addJobSpeciality')

      addJobSpeciality.addEventListener('click', function (e) {
        const jobSpecialityExample = e.target.parentElement.querySelector('.example')
        const jobSpecialityClone = jobSpecialityExample.cloneNode(true)
        jobSpecialityClone.classList.remove('example')
        jobSpecialityExample.parentElement.append(jobSpecialityClone)

        // проверка количества блоков для добавления специальности в место работы 
        let jobSpecialityCount = 0

        jobSpecialityClone.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
          if (!item.classList.contains('example'))
            jobSpecialityCount++
        })

        if (jobSpecialityCount == 1) {
          // диактивировать кнопку удаления 
          jobSpecialityClone.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
            if (!item.classList.contains('example'))
              item.querySelector('.js-removeJobspeciality').style.display = 'none'
          })

        } else {

          jobSpecialityClone.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
            if (!item.classList.contains('example'))
              item.querySelector('.js-removeJobspeciality').style.display = 'block'
          })
        }

        const removejobSpeciality = jobSpecialityClone.querySelector('.js-removeJobspeciality')
        removejobSpeciality.addEventListener('click', function (e) {
          jobSpecialityClone.remove()
          // проверка количества блоков для добавления специальности в место работы 
          let jobSpecialityCount = 0

          jobSpecialityExample.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
            if (!item.classList.contains('example'))
              jobSpecialityCount++
          })

          if (jobSpecialityCount == 1) {
            // диактивировать кнопку удаления 
            jobSpecialityExample.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
              if (!item.classList.contains('example'))
                item.querySelector('.js-removeJobspeciality').style.display = 'none'
            })

          } else {

            jobSpecialityExample.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
              if (!item.classList.contains('example'))
                item.querySelector('.js-removeJobspeciality').style.display = 'block'
            })
          }
        })

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

const jobdeleteBtn = document.querySelector('.js-removeJob')
if (jobdeleteBtn)
  jobdeleteBtn.addEventListener('click', function (e) {
    jobdeleteBtn.parentElement.remove()
    // проверка количества блоков для добавления специальности
    let jobCount = 0
    document.querySelectorAll('.settings-jobs__block').forEach(function (item) {
      if (!item.classList.contains('example'))
        jobCount++
    })
    if (jobCount == 1) {
      // диактивировать кнопку удаления 
      document.querySelectorAll('.settings-jobs__block').forEach(function (item) {
        if (!item.classList.contains('example'))
          item.querySelector('.js-removeJob').style.display = 'none'
      })

    } else {

      document.querySelectorAll('.settings-jobs__block').forEach(function (item) {
        if (!item.classList.contains('example'))
          item.querySelector('.js-removeJob').style.display = 'block'
      })
    }
  })


// добавление специальности в место работы (1ое, которое всегда показывается)
const addJobSpecialityTemp = document.querySelector('#addJobSpecialityTemp')
if (addJobSpecialityTemp)
  addJobSpecialityTemp.addEventListener('click', function (e) {
    const jobSpecialityExample = e.target.parentElement.querySelector('.example')
    const jobSpecialityClone = jobSpecialityExample.cloneNode(true)
    jobSpecialityClone.classList.remove('example')
    jobSpecialityExample.parentElement.append(jobSpecialityClone)




    // проверка количества блоков для добавления специальности в место работы 
    let jobSpecialityCount = 0

    jobSpecialityClone.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
      if (!item.classList.contains('example'))
        jobSpecialityCount++
    })

    if (jobSpecialityCount == 1) {
      // диактивировать кнопку удаления 
      jobSpecialityClone.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
        if (!item.classList.contains('example'))
          item.querySelector('.js-removeJobspeciality').style.display = 'none'
      })

    } else {

      jobSpecialityClone.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
        if (!item.classList.contains('example'))
          item.querySelector('.js-removeJobspeciality').style.display = 'block'
      })
    }


    const remove = jobSpecialityClone.querySelector('.js-removeJobspeciality')
    remove.addEventListener('click', function (param) {
      jobSpecialityClone.remove()

      let jobSpecialityCount = 0

      jobSpecialityExample.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
        if (!item.classList.contains('example'))
          jobSpecialityCount++
      })

      if (jobSpecialityCount == 1) {
        // диактивировать кнопку удаления 
        jobSpecialityExample.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
          if (!item.classList.contains('example'))
            item.querySelector('.js-removeJobspeciality').style.display = 'none'
        })

      } else {

        jobSpecialityExample.parentElement.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
          if (!item.classList.contains('example'))
            item.querySelector('.js-removeJobspeciality').style.display = 'block'
        })
      }
    })


  })

const removeJobSpecialityTemp = document.querySelector('#removeJobspecialityTemp')

if (removeJobSpecialityTemp) {
  removeJobSpecialityTemp.addEventListener('click', function (e) {
    const parent = removeJobSpecialityTemp.parentElement.parentElement
    removeJobSpecialityTemp.parentElement.remove()
    let jobSpecialityCount = 0

    parent.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
      if (!item.classList.contains('example'))
        jobSpecialityCount++
    })

    if (jobSpecialityCount == 1) {
      // диактивировать кнопку удаления 
      parent.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
        if (!item.classList.contains('example'))
          item.querySelector('.js-removeJobspeciality').style.display = 'none'
      })

    } else {

      parent.querySelectorAll('.settings-jobs__speciality .input-block').forEach(function (item) {
        if (!item.classList.contains('example'))
          item.querySelector('.js-removeJobspeciality').style.display = 'block'
      })
    }
  })
}



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

      $('input.currency-field').mask('000000')
      $('input.phone').mask('(000) 000-00-00')


      // проверка количества блоков для добавления специальности
      let appointmentCount = 0
      document.querySelectorAll('.settings-appointment__block').forEach(function (item) {
        if (!item.classList.contains('example'))
          appointmentCount++
      })
      if (appointmentCount == 1) {
        // диактивировать кнопку удаления 
        document.querySelectorAll('.settings-appointment__block').forEach(function (item) {
          if (!item.classList.contains('example'))
            item.querySelector('.js-removeApointment').style.display = 'none'
        })

      } else {

        document.querySelectorAll('.settings-appointment__block').forEach(function (item) {
          if (!item.classList.contains('example'))
            item.querySelector('.js-removeApointment').style.display = 'block'
        })
      }

      // запрет оставлять чекбокс пустым (в 1ом блоке приема, которое показывается всегда )
      const appointmentTypeTemp = clone.querySelectorAll('.settings-appointment__type .checkbox input')
      if (appointmentTypeTemp.length > 0)
        appointmentTypeTemp.forEach(function (checkbox) {
          checkbox.addEventListener('change', function (e) {

            let checkedCount = 0
            appointmentTypeTemp.forEach(function (ch) {
              if (ch.checked)
                checkedCount++
            })

            if (checkedCount == 0)
              checkbox.checked = true
          })

        })


      const deleteBtn = clone.querySelector('.js-removeApointment')
      deleteBtn.addEventListener('click', function (e) {
        clone.remove()
        // проверка количества блоков для добавления специальности
        let appointmentCount = 0
        document.querySelectorAll('.settings-appointment__block').forEach(function (item) {
          if (!item.classList.contains('example'))
            appointmentCount++
        })
        if (appointmentCount == 1) {
          // диактивировать кнопку удаления 
          document.querySelectorAll('.settings-appointment__block').forEach(function (item) {
            if (!item.classList.contains('example'))
              item.querySelector('.js-removeApointment').style.display = 'none'
          })

        } else {

          document.querySelectorAll('.settings-appointment__block').forEach(function (item) {
            if (!item.classList.contains('example'))
              item.querySelector('.js-removeApointment').style.display = 'block'
          })
        }
      })

      // установка слушателей на дропдауны
      $(clone.querySelectorAll('.select')).on('focus', '.select__head', onSelectFocus)
      $(clone.querySelectorAll('.select')).on('click', '.select__item', droplistChooseItem)
      $(clone.querySelectorAll('.select select__head input')).on('focus', onInputFocus)

      clone.querySelectorAll('.select input').forEach(function (input) {


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
            if (userName.indexOf(request) != -1 || request.indexOf(userName) != -1) {

              item.style.display = 'block'

              elemToShow++

            } else if (dataSearch != '' && (dataSearch.indexOf(request) != -1 || request.indexOf(dataSearch) != -1)) {
              item.style.display = 'block'
              item.addEventListener('click', droplistChooseItem)

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
        $('input.currency-field').mask('000000')

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
        $('input.phone').mask('(000) 000-00-00')

        $('input.currency-field').mask('000000')

      })
    })
  })
}

// удаление приема (1ое, которое всегда показывается)
const removeAppointmentTemp = document.querySelector('.js-removeApointmentTemp')
const cityAppointmentTemp = document.querySelectorAll('.settings-appointment__block')
if (cityAppointmentTemp.length > 0) {
  cityAppointmentTemp.forEach(function (item) {
    if (!item.classList.contains('example'))
    // console.log(item.querySelector('')
    {
      item.querySelectorAll('.settings-appointment__text').forEach(function (hint) {
        if (hint.textContent == "Город") {
          const newItem = hint.parentElement
          // console.log(newItem)
          $(newItem.querySelectorAll('.select')).on('focus', '.select__head', onSelectFocus)
          $(newItem.querySelectorAll('.select')).on('click', '.select__item', droplistChooseItem)
          $(newItem.querySelectorAll('.select select__head input')).on('focus', onInputFocus)
        }

      })
    }

  })
}
if (removeAppointmentTemp) {
  removeAppointmentTemp.addEventListener('click', function (e) {
    removeAppointmentTemp.parentElement.remove()
    // проверка количества блоков для добавления специальности
    let appointmentCount = 0
    document.querySelectorAll('.settings-appointment__block').forEach(function (item) {
      if (!item.classList.contains('example'))
        appointmentCount++
    })
    if (appointmentCount == 1) {
      // диактивировать кнопку удаления 
      document.querySelectorAll('.settings-appointment__block').forEach(function (item) {
        if (!item.classList.contains('example'))
          item.querySelector('.js-removeApointment').style.display = 'none'
      })

    } else {

      document.querySelectorAll('.settings-appointment__block').forEach(function (item) {
        if (!item.classList.contains('example'))
          item.querySelector('.js-removeApointment').style.display = 'block'
      })
    }
  })

  // запрет оставлять чекбокс пустым (в 1ом блоке приема, которое показывается всегда )
  const appointmentTypeTemp = removeAppointmentTemp.parentElement.querySelectorAll('.settings-appointment__type .checkbox input')
  if (appointmentTypeTemp.length > 0)
    appointmentTypeTemp.forEach(function (checkbox) {
      checkbox.addEventListener('change', function (e) {

        let checkedCount = 0
        appointmentTypeTemp.forEach(function (ch) {
          if (ch.checked)
            checkedCount++
        })

        if (checkedCount == 0)
          checkbox.checked = true
      })

    })
}
// добавление позиции услуги в приеме (1ое, которое всегда показывается)
const addPriceItemTemp = document.querySelector('#addPriceItemTemp')
if (addPriceItemTemp) {

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
    $('input.currency-field').mask('000000')

  })
}

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
    $('input.phone').mask('(000) 000-00-00')

  })


// редактирование внешнего вида 

const view = document.querySelector('#viewBg')
const bgBtn0 = document.querySelectorAll('.js-setBg0')
const bgBtn1 = document.querySelectorAll('.js-setBg1')
const bgBtn2 = document.querySelectorAll('.js-setBg2')
const bgBtn3 = document.querySelectorAll('.js-setBg3')
const bgBtn4 = document.querySelectorAll('.js-setBg4')
const bgBtn5 = document.querySelectorAll('.js-setBg5')
const bgBtn6 = document.querySelectorAll('.js-setBg6')
const bgBtn7 = document.querySelectorAll('.js-setBg7')
const bgBtn8 = document.querySelectorAll('.js-setBg8')
const sectionNav = document.querySelector('.section-nav')
const sectionTitile = document.querySelector('.section-title')
console.log(bgBtn1)
if (view && bgBtn0.length > 0 && bgBtn1.length > 0 && bgBtn2.length > 0 && bgBtn3.length > 0 && bgBtn4.length > 0 && bgBtn5.length > 0 && bgBtn6.length > 0 && bgBtn7.length > 0 && bgBtn8.length > 0 && sectionNav && sectionTitile) {
  bgBtn0.forEach(function (btn) {

    btn.addEventListener('change', function (e) {
      view.classList.remove('bg-0')
      view.classList.remove('bg-1')
      view.classList.remove('bg-2')
      view.classList.remove('bg-3')
      view.classList.remove('bg-4')
      view.classList.remove('bg-5')
      view.classList.remove('bg-6')
      view.classList.remove('bg-7')
      view.classList.remove('bg-8')
      view.classList.add('bg-0')

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
  })
  bgBtn1.forEach(function (btn) {
    btn.addEventListener('change', function (e) {
      view.classList.remove('bg-0')
      view.classList.remove('bg-1')
      view.classList.remove('bg-2')
      view.classList.remove('bg-3')
      view.classList.remove('bg-4')
      view.classList.remove('bg-5')
      view.classList.remove('bg-6')
      view.classList.remove('bg-7')
      view.classList.remove('bg-8')
      view.classList.add('bg-1')

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
  })

  bgBtn2.forEach(function (btn) {
    btn.addEventListener('change', function (e) {
      view.classList.remove('bg-0')
      view.classList.remove('bg-1')
      view.classList.remove('bg-2')
      view.classList.remove('bg-3')
      view.classList.remove('bg-4')
      view.classList.remove('bg-5')
      view.classList.remove('bg-6')
      view.classList.remove('bg-7')
      view.classList.remove('bg-8')
      view.classList.add('bg-2')
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
  })
  bgBtn3.forEach(function (btn) {
    btn.addEventListener('change', function (e) {
      view.classList.remove('bg-0')
      view.classList.remove('bg-1')
      view.classList.remove('bg-2')
      view.classList.remove('bg-3')
      view.classList.remove('bg-4')
      view.classList.remove('bg-5')
      view.classList.remove('bg-6')
      view.classList.remove('bg-7')
      view.classList.remove('bg-8')
      view.classList.add('bg-3')

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
  })
  bgBtn4.forEach(function (btn) {
    btn.addEventListener('change', function (e) {
      view.classList.remove('bg-0')
      view.classList.remove('bg-1')
      view.classList.remove('bg-2')
      view.classList.remove('bg-3')
      view.classList.remove('bg-4')
      view.classList.remove('bg-5')
      view.classList.remove('bg-6')
      view.classList.remove('bg-7')
      view.classList.remove('bg-8')
      view.classList.add('bg-4')

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
  })
  bgBtn5.forEach(function (btn) {

    btn.addEventListener('change', function (e) {
      view.classList.remove('bg-0')
      view.classList.remove('bg-1')
      view.classList.remove('bg-2')
      view.classList.remove('bg-3')
      view.classList.remove('bg-4')
      view.classList.remove('bg-5')
      view.classList.remove('bg-6')
      view.classList.remove('bg-7')
      view.classList.remove('bg-8')
      view.classList.add('bg-5')

      sectionNav.querySelectorAll('img').forEach(function (item) {
        let value = item.getAttribute('src')
        let src = value.substr(0, value.lastIndexOf('/') + 1) + 'arrow-icon.svg'
        item.setAttribute('src', src)

      })

      sectionTitile.style.color = "#ffffff"

      sectionTitile.querySelector('img').setAttribute('src', sectionTitile.querySelector('img').getAttribute('src').substr(0, sectionTitile.querySelector('img').getAttribute('src').lastIndexOf('/') + 1) + 'back-icon_white.svg')


    })
  })
  bgBtn6.forEach(function (btn) {
    btn.addEventListener('change', function (e) {
      view.classList.remove('bg-0')
      view.classList.remove('bg-1')
      view.classList.remove('bg-2')
      view.classList.remove('bg-3')
      view.classList.remove('bg-4')
      view.classList.remove('bg-5')
      view.classList.remove('bg-6')
      view.classList.remove('bg-7')
      view.classList.remove('bg-8')
      view.classList.add('bg-6')

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
  })
  bgBtn7.forEach(function (btn) {
    btn.addEventListener('change', function (e) {
      view.classList.remove('bg-0')
      view.classList.remove('bg-1')
      view.classList.remove('bg-2')
      view.classList.remove('bg-3')
      view.classList.remove('bg-4')
      view.classList.remove('bg-5')
      view.classList.remove('bg-6')
      view.classList.remove('bg-7')
      view.classList.remove('bg-8')
      view.classList.add('bg-7')

      sectionNav.querySelectorAll('img').forEach(function (item) {
        let value = item.getAttribute('src')
        let src = value.substr(0, value.lastIndexOf('/') + 1) + 'arrow-icon.svg'
        item.setAttribute('src', src)

      })

      sectionTitile.style.color = "#182744"
      sectionTitile.querySelector('img').setAttribute('src', sectionTitile.querySelector('img').getAttribute('src').substr(0, sectionTitile.querySelector('img').getAttribute('src').lastIndexOf('/') + 1) + 'back-icon_black.svg')


    })

  })
  bgBtn8.forEach(function (btn) {
    btn.addEventListener('change', function (e) {
      view.classList.remove('bg-0')
      view.classList.remove('bg-1')
      view.classList.remove('bg-2')
      view.classList.remove('bg-3')
      view.classList.remove('bg-4')
      view.classList.remove('bg-5')
      view.classList.remove('bg-6')
      view.classList.remove('bg-7')
      view.classList.remove('bg-8')
      view.classList.add('bg-8')


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

      this.value = this.value.replace(codeFormat, '')

      codeArray[i - 1] = this.value

      codeCounter = codeFields[0].value.length + codeFields[1].value.length + codeFields[2].value.length + codeFields[3].value.length
      if (codeCounter == 16) {
        code = codeFields[0].value + codeFields[1].value + codeFields[2].value + codeFields[3].value
        codeTrueField.value = code
        sendCode.classList.remove('disabled')
      } else
        sendCode.classList.add('disabled')

      // переход к следующему полю, если это заполнено
      if (this.value.length == 4 && i < codeFields.length - 1) {
        codeFields[i + 1].focus()

      }

      // если заполнено последнее поле
      if (this.value.length == 4 && i == codeFields.length) {
        sendCode.focus()
      }

      // переход к предыдущему полю, если это очищено
      if (this.value.length == 0 && i > 0 && !isIE) {
        codeFields[i - 1].focus()

      }
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
$('input.currency-field').mask('000000')


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

$('#settingsProfileForm').validate({

  rules: {
    surname: {
      required: true,
    },

    name: {
      required: true,
    },
    patronymic: {
      required: true,
    },
    birthday: {
      required: true,
    },
    universityName: {
      required: true,
    },
    universityFinishedYear: {
      required: true,
    },
    speciality: {
      required: true,
    },
    universityName1: {
      required: true,
    },
    universityFinishedYear1: {
      required: true,
    },
    specialization1: {
      required: true,
    },
    speciality1: {
      required: true,
    },
    appointmentPlace: {
      required: true,
    },
    appointmentCity: {
      required: true,
    },

    phone: {
      required: true,
    },
  },
  messages: {

    surname: {
      minlength: jQuery.validator.format("Поле не заполнено "),
      required: jQuery.validator.format("Поле не заполнено")
    },
    name: {
      minlength: jQuery.validator.format("Поле не заполнено "),
      required: jQuery.validator.format("Поле не заполнено")
    },
    patronymic: {
      minlength: jQuery.validator.format("Поле не заполнено "),
      required: jQuery.validator.format("Поле не заполнено")
    },
    birthday: {
      required: jQuery.validator.format("Поле не заполнено")
    },
    universityName: {
      minlength: jQuery.validator.format("Введите полное название учебного заведения "),
      required: jQuery.validator.format("Поле не заполнено")
    },
    universityFinishedYear: {
      required: jQuery.validator.format("Поле не заполнено")
    },
    speciality: {
      required: jQuery.validator.format("Поле не заполнено")
    },
    universityName1: {
      minlength: jQuery.validator.format("Введите полное название учебного заведения "),
      required: jQuery.validator.format("Поле не заполнено")
    },
    universityFinishedYear1: {
      required: jQuery.validator.format("Поле не заполнено")
    },
    specialization1: {
      required: jQuery.validator.format("Поле не заполнено")
    },
    speciality1: {
      required: jQuery.validator.format("Поле не заполнено")
    },
    appointmentPlace: {
      required: jQuery.validator.format("Поле не заполнено")
    },
    appointmentCity: {
      required: jQuery.validator.format("Поле не заполнено")
    },
    phone: {
      minlength: jQuery.validator.format("Поле не заполнено "),
      required: jQuery.validator.format("Поле не заполнено")
    },
  },
  highlight: function (element) {
    $(element).parent('div').addClass('error');
    $(element).addClass('invalid');
  },
  unhighlight: function (element) {
    $(element).parent('div').addClass('error 2');
    $(element).removeClass('invalid');

  },
  // errorPlacement: function (error, element) {
  //   $(element).parent('div').addClass('error')
  //   // console.log(element.parent('div'))
  //   // if (element.parent('div')) {
  //   //   //     $(this).prev("div").addClass('checkbox-error');
  //   // } else {
  //   //   return true;
  //   // }

  // },
  errorElement: "div",
  errorClass: "invalid",

});

// активация / диактивация кнопки отправки формы НА СТРАНИЦЕ ЗАПОЛНЕНИЯ ПРОФИЛЯ 

function activateProfileSubmit(form) {



  function onChangeField() {
    if (form != null) {

      if (this.classList.contains('js-field-req')) {
        if (this.classList.contains('phone') && this.getAttribute('type') == 'text') {
          if (this.value.length == 15)
            this.classList.add('success')
          else
            this.classList.remove('success')
        } else {
          let minlenght = (this.hasAttribute('minlength')) ? this.getAttribute('minlength') : -1
          if (this.value.length > minlenght)
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

  function onChangeBDField() {
    // alert('клик по др')
    this.parentElement.parentElement.querySelector('.select__head input').classList.add('success')
    checkForm()
  }

  function checkForm() {

    if (form != null) {
      let successFieldsCount = form.querySelectorAll('.success').length
      // console.log(fieldsCount + '-' + successFieldsCount)
      // fields.forEach(function (i) {
      //   if (!i.classList.contains('success'))
      //     console.log(i)
      // })
      if (successFieldsCount == fieldsCount) {
        form.querySelectorAll('input.form-submit').forEach(function (item) {
          item.classList.remove('disabled')
        })
        // form.querySelector('input.form-submit').classList.remove('disabled')

      } else {
        form.querySelectorAll('input.form-submit').forEach(function (item) {
          item.classList.add('disabled')
          // console.log(item)
        })
        // form.querySelector('input.form-submit').classList.add('disabled')
      }
    }

  }



  const fields = (form == null) ? null : form.querySelectorAll('.js-field-req')
  let fieldsCount = (form == null) ? -1 : fields.length

  if (fields != null && fields.length > 0)
    fields.forEach(function (field) {

      if (field.parentElement.parentElement.classList.contains('select') && !field.parentElement.parentElement.classList.contains('js-BDselect')) { // проверка дроплиста
        const selectItems = field.parentElement.parentElement.querySelectorAll('.select__item')
        selectItems.forEach(function (item) {
          item.addEventListener('click', onChangeField)
        })

      } else if (field.parentElement.parentElement.classList.contains('js-BDselect')) {
        const selectBDItems = field.parentElement.parentElement.querySelectorAll('.select__item')
        selectBDItems.forEach(function (item) {
          item.addEventListener('click', onChangeBDField)
        })

      } else {
        field.addEventListener('input', onChangeField)
      }


    })

  form.addEventListener('submit', function (e) {
    let BDsuccessCount
    fields.forEach(function (field) {
      if (field.parentElement.parentElement.classList.contains('js-BDselect')) {
        if (!field.classList.contains('success')) {
          field.classList.add('invalid')
        } else {
          BDsuccessCount++
        }


        if (BDsuccessCount >= 3) {
          const BDerror = document.querySelector('.js-BDerror')
          BDerror.style.display = 'none'
        }
      }
    })
  })
}

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
        form.querySelector('input.form-submit').classList.remove('disabled')

      } else {
        form.querySelector('input.form-submit').classList.add('disabled')
      }
    }

  }


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

if (document.querySelector('#settingsProfileForm')) {
  activateProfileSubmit(document.querySelector('#settingsProfileForm'))
  // if (innerWidth <= 1024) {
  //   document.querySelector('.js-settingsFormSubmit').addEventListener('click', function (e) {
  //     document.querySelector('#settingsProfileForm').submit()

  //   })
  // }
}


// Мои коллеги 
const colleaguesRecommendMeWrap = document.querySelector('.js-recommendMe')
const recommendMeMore = document.querySelector('.js-catalogMore-recommendMe')

const colleaguesIRecommendWrap = document.querySelector('.js-IRecommend')
const IRecommendMore = document.querySelector('.js-catalogMore-IRrecommend')

const colleaguesWouldRecommendWrap = document.querySelector('.js-wouldRecommend')
const wouldRecommendMore = document.querySelector('.js-catalogMore-wouldRecommend')
if (colleaguesRecommendMeWrap != null && colleaguesIRecommendWrap != null && colleaguesWouldRecommendWrap != null) {
  let recommendMeCount = colleaguesRecommendMeWrap.querySelectorAll('.recommendMe').length
  let IRecommendCount = colleaguesIRecommendWrap.querySelectorAll('.IRecommend').length
  let wouldRecommendCount = colleaguesWouldRecommendWrap.querySelectorAll('.wouldRecommend').length
  if (recommendMeCount <= 6)
    recommendMeMore.classList.add('disabled')
  else
    recommendMeMore.classList.remove('disabled')

  if (IRecommendCount <= 6)
    IRecommendMore.classList.add('disabled')
  else
    IRecommendMore.classList.remove('disabled')

  if (wouldRecommendCount <= 6)
    wouldRecommendMore.classList.add('disabled')
  else
    wouldRecommendMore.classList.remove('disabled')


  recommendMeMore.addEventListener('click', function (e) {
    let i = 1
    colleaguesRecommendMeWrap.querySelectorAll('.recommendMe').forEach(function (item) {
      if (!item.classList.contains('opened')) {
        if (i <= 6) {
          item.classList.add('opened')
          i++
        }
      }
    })

    if (colleaguesRecommendMeWrap.querySelectorAll('.recommendMe').length == colleaguesRecommendMeWrap.querySelectorAll('.recommendMe.opened').length) {
      recommendMeMore.classList.add('disabled')

    }

  })
  IRecommendMore.addEventListener('click', function (e) {
    let i = 1
    colleaguesIRecommendWrap.querySelectorAll('.IRecommend').forEach(function (item) {
      if (!item.classList.contains('opened')) {
        if (i <= 6) {
          item.classList.add('opened')
          i++
        }
      }
    })

    if (colleaguesIRecommendWrap.querySelectorAll('.IRecommend').length == colleaguesIRecommendWrap.querySelectorAll('.IRecommend.opened').length) {
      IRecommendMore.classList.add('disabled')
    }

  })
  wouldRecommendMore.addEventListener('click', function (e) {
    let i = 1
    colleaguesWouldRecommendWrap.querySelectorAll('.wouldRecommend').forEach(function (item) {
      if (!item.classList.contains('opened')) {
        if (i <= 6) {
          item.classList.add('opened')
          i++
        }
      }
    })

    if (colleaguesWouldRecommendWrap.querySelectorAll('.IRecommend').length == colleaguesWouldRecommendWrap.querySelectorAll('.IRecommend.opened').length) {
      wouldRecommendMore.classList.add('disabled')
    }

  })

}


// открытие пунктов 
const educationMoreBtn = document.querySelector('.js-moreEducation')
const educationWrap = document.querySelector('.profile-education__list')

const experianceMoreBtn = document.querySelector('.js-experiance-more')
const experianceWrap = document.querySelector('.profile-education__wrap.experiance')

const appointmentWrap = document.querySelectorAll('.js-appointmentMoreWrap')

if (educationMoreBtn && educationWrap) {
  let educationCount = educationWrap.querySelectorAll('.js-education').length

  if (educationCount <= 3)
    educationMoreBtn.classList.add('disabled')
  else
    educationMoreBtn.classList.remove('disabled')


  educationMoreBtn.addEventListener('click', function (e) {
    let i = 1
    educationWrap.querySelectorAll('.js-education').forEach(function (item) {
      if (!item.classList.contains('opened')) {
        if (i <= 3) {
          item.classList.add('opened')
          i++
        }
      }
    })

    if (educationWrap.querySelectorAll('.js-education').length == educationWrap.querySelectorAll('.js-education.opened').length) {
      educationMoreBtn.classList.add('disabled')

    }

  })


}

if (experianceWrap && experianceMoreBtn) {
  let experianceCount = experianceWrap.querySelectorAll('.experiance-item').length

  if (experianceCount <= 3)
    experianceMoreBtn.classList.add('disabled')
  else
    experianceMoreBtn.classList.remove('disabled')

  experianceMoreBtn.addEventListener('click', function (e) {
    let i = 1
    experianceWrap.querySelectorAll('.experiance-item').forEach(function (item) {
      if (!item.classList.contains('opened')) {
        if (i <= 3) {
          item.classList.add('opened')
          i++
        }
      }
    })

    if (experianceWrap.querySelectorAll('.experiance-item').length == experianceWrap.querySelectorAll('.experiance-item.opened').length) {
      experianceMoreBtn.classList.add('disabled')

    }

  })
}
if (appointmentWrap.length > 0) {
  appointmentWrap.forEach(function (item) {
    let appointmentCount = item.querySelectorAll('.descr-item').length
    const appointmentMoreBtn = item.querySelector('.js-appointmentMore')

    if (appointmentMoreBtn) {
      if (appointmentCount <= 3)
        appointmentMoreBtn.classList.add('disabled')
      else
        appointmentMoreBtn.classList.remove('disabled')

      appointmentMoreBtn.addEventListener('click', function (e) {
        let i = 1
        item.querySelectorAll('.descr-item').forEach(function (item) {
          if (!item.classList.contains('opened')) {
            if (i <= 3) {
              item.classList.add('opened')
              i++
            }
          }
        })

        if (item.querySelectorAll('.descr-item').length == item.querySelectorAll('.descr-item.opened').length) {
          appointmentMoreBtn.classList.add('disabled')

        }

      })
    }


  })

}

const validatuinFields = document.querySelectorAll('.js-validation-field')



if (validatuinFields.length > 0)
  validatuinFields.forEach(function (field) {

    field.addEventListener('input', function (e) {
      var er = document.createElement('div');
      if (field.hasAttribute('data-minhint'))
        er.innerHTML = field.getAttribute('data-minhint')
      else
        er.innerHTML = 'Поле не заполнено';
      er.classList.add('invalid')
      if (field.getAttribute('type') == 'text') {

        if (field.classList.contains('js-birthday')) {

        } else {

          let minlength = field.getAttribute('minlength')
          let maxlength = field.getAttribute('maxlength')

          let str = /[^A-Za-zА-Яа-яЁё()-.,]/g

          field.value = field.value.replace(str, '')

          if (field.value.length < minlength) {
            field.classList.add('invalid')
            if (field.parentElement.querySelectorAll('div.invalid').length == 0)
              field.parentElement.append(er)

          } else {
            field.classList.remove('invalid')
            field.classList.add('success')
            if (field.parentElement.querySelector('div.invalid'))
              field.parentElement.querySelector('div.invalid').remove()

          }
          if (field.value.length >= maxlength) {
            field.value = field.value.replace(field.value, field.value.substr(0, maxlength))
          }
        }

      }
    })
  })