const formArrValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputInvalidClass: 'popup__input_type_error',
  submitBtnSelector: '.popup__submit',
  inactiveBtnClass: 'popup__submit_disabled'
}



//функция для валидации
const enableValidation = (formItem) => {
  const arrayForms = Array.from(document.querySelectorAll(formItem.formSelector));
  arrayForms.forEach((formElement) => {
    preventDefaultForm(formElement)
    //облась с импутами
    const formInputs = Array.from(formElement.querySelectorAll(formItem.inputSelector));
    //кнопки сохранить
    const buttonSubmit = formElement.querySelector(formItem.submitBtnSelector);
    //перебор всех инпутов
    formInputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        //ошибка
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        //проверка на валидность
        const isFormInvalid = formInputs.some((inputElement) => !inputElement.validity.valid);
        checkValidInput(inputElement, errorElement);
        toggleBtn(isFormInvalid, buttonSubmit);
      })
    })
  })
};


//функция сброса стандартного поведения сабмита
function preventDefaultForm(elements) {
  elements.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
};
//удаление ошибок в формах
function resetForms(form) {
  const arrForm = form.querySelectorAll(formArrValidate.inputSelector);
  arrForm.forEach((el) => {
    const errorEl = form.querySelector(`#${el.name}-error`);
    hideError(el, errorEl);
  })
}
//возвращение формы
function hideError(el, errorEl) {
  el.classList.remove(formArrValidate.inputInvalidClass);
  errorEl.textContent = '';
}

//функция проверки формы на валидность
function checkValidInput(element, error) {
  if (!element.validity.valid) {
    element.classList.add(formArrValidate.inputInvalidClass);
    error.textContent = element.validationMessage;
  } else {
    hideError(element, error);
  }
}

function disableBtn(form) {
  const btnElement = form.querySelector(formArrValidate.submitBtnSelector);
  inactiveBtn(btnElement);
}

function inactiveBtn(btn) {
  btn.classList.add(formArrValidate.inactiveBtnClass);
  btn.disabled = true;
}

//функция проверки кнопки
function toggleBtn(invalid, button) {
  if (invalid) {
    button.classList.add(formArrValidate.inactiveBtnClass);
    button.disabled = true;
  } else {
    button.classList.remove(formArrValidate.inactiveBtnClass);
    button.disabled = false;
  }
}

enableValidation(formArrValidate);
