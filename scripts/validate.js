const formArrValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputInvalidClass: 'popup__input_type_error',
  submitBtnSelector: '.popup__submit',
  inactiveBtnClass: 'popup__submit_disabled'
}


const enableValidation = (formItem) => {
  const arrayForms = Array.from(document.querySelectorAll(formItem.formSelector));
  arrayForms.forEach((formElement) => {
    preventDefaultForm(formElement)
    const formInputs = Array.from(formElement.querySelectorAll(formItem.inputSelector));
    const buttonSubmit = formElement.querySelector(formItem.submitBtnSelector);
    formInputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        const isFormInvalid = formInputs.some((inputElement) => !inputElement.validity.valid);
        checkValidInput(inputElement, errorElement);
        toggleBtn(isFormInvalid, buttonSubmit);
      })
    })
  })
};


function preventDefaultForm(elements) {
  elements.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
};
function resetForms(form) {
  const arrForm = form.querySelectorAll(formArrValidate.inputSelector);
  arrForm.forEach((el) => {
    const errorEl = form.querySelector(`#${el.name}-error`);
    hideError(el, errorEl);
  })
}
function hideError(el, errorEl) {
  el.classList.remove(formArrValidate.inputInvalidClass);
  errorEl.textContent = '';
}


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
