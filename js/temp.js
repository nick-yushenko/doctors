  // добавление профильной специальности в СПО 
  const addEducationSpeciality = document.querySelector('#addEducationSpeciality')
  if (addEducationSpeciality)
    addEducationSpeciality.addEventListener('click', function (e) {
      const educationSpecialityExample = e.target.parentElement.querySelector('.example')
      const educationSpecialityClone = educationSpecialityExample.cloneNode(true)
      educationSpecialityClone.classList.remove('example')
      educationSpecialityExample.parentElement.append(educationSpecialityClone)



      // проверка количества блоков для добавления специальности в место работы 
      let educationSpecialityCount = 0

      educationSpecialityClone.parentElement.querySelectorAll('.settings-jobs__speciality .select').forEach(function (item) {
        if (!item.classList.contains('example'))
          educationSpecialityCount++
      })
      if (educationSpecialityCount == 1) {
        // диактивировать кнопку удаления 
        educationSpecialityClone.parentElement.querySelectorAll('.settings-jobs__speciality .select').forEach(function (item) {
          if (!item.classList.contains('example')) {
            tem.querySelector('.js-removeEducationSpeciality').style.display = 'none'
            item.querySelector('.js-removeEducationSpeciality').style.zIndex = '3'
            item.classList.remove('withoutArrow')
          }
        })

      } else {

        educationSpecialityClone.parentElement.querySelectorAll('.settings-jobs__speciality .select').forEach(function (item) {
          if (!item.classList.contains('example')) {
            item.querySelector('.js-removeEducationSpeciality').style.display = 'block'
            item.querySelector('.js-removeEducationSpeciality').style.zIndex = '3'
            item.classList.add('withoutArrow')
          }
        })
      }

      $(educationSpecialityClone).on('focus', '.select__head', onSelectFocus)
      $(educationSpecialityClone).on('click', '.select__item', droplistChooseItem)
      $(educationSpecialityClone.querySelectorAll('.select__head input')).on('focus', onInputFocus)

      const remove = educationSpecialityClone.querySelector('.js-removeEducationSpeciality')
      remove.addEventListener('click', function (param) {
        educationSpecialityClone.remove()

        let educationSpecialityCount = 0

        educationSpecialityExample.parentElement.querySelectorAll('.settings-jobs__speciality .select').forEach(function (item) {
          if (!item.classList.contains('example'))
            educationSpecialityCount++
        })

        if (educationSpecialityCount == 1) {
          // диактивировать кнопку удаления 
          educationSpecialityExample.parentElement.querySelectorAll('.settings-jobs__speciality .select').forEach(function (item) {
            if (!item.classList.contains('example')) {
              item.querySelector('.js-removeEducationSpeciality').style.display = 'none'
              item.querySelector('.js-removeEducationSpeciality').style.zIndex = '3'
              item.classList.remove('withoutArrow')
            }
          })

        } else {

          educationSpecialityExample.parentElement.querySelectorAll('.settings-jobs__speciality .select').forEach(function (item) {
            if (!item.classList.contains('example')) {
              item.querySelector('.js-removeEducationSpeciality').style.display = 'block'
              item.querySelector('.js-removeEducationSpeciality').style.zIndex = '3'
              item.classList.add('withoutArrow')
            }
          })
        }
      })


    })
  const removeEducationSpecialityTemp = document.querySelector('#removeEducationSpecialityTemp')
  if (removeEducationSpecialityTemp) {
    removeEducationSpecialityTemp.addEventListener('click', function (e) {
      const parent = removeEducationSpecialityTemp.parentElement.parentElement
      removeEducationSpecialityTemp.parentElement.remove()
      let specialityCount = 0

      parent.querySelectorAll('.settings-jobs__speciality .select').forEach(function (item) {
        if (!item.classList.contains('example'))
          specialityCount++
      })


      if (specialityCount == 1) {
        // диактивировать кнопку удаления 
        parent.querySelectorAll('.settings-jobs__speciality .select').forEach(function (item) {
          if (!item.classList.contains('example')) {
            item.querySelector('.js-removeEducationSpeciality').style.display = 'none'
            item.querySelector('.js-removeEducationSpeciality').style.zIndex = '3'
            item.classList.remove('withoutArrow')
          }
        })

      } else {

        parent.querySelectorAll('.settings-jobs__speciality .select').forEach(function (item) {
          if (!item.classList.contains('example')) {
            item.querySelector('.js-removeEducationSpeciality').style.display = 'block'
            item.querySelector('.js-removeEducationSpeciality').style.zIndex = '3'
            item.classList.add('withoutArrow')
          }
        })
      }
    })
  }