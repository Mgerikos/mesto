export class FormValidator {
  constructor(formItem) {
    this._formSelector = formItem.formSelector;
    this._inputSelector = formItem.inputSelector;
    this._submitBtnSelector = formItem.submitBtnSelector;
    this._inputInvalidClass = formItem.inputInvalidClass;
    this._inactiveBtnClass = formItem.inactiveBtnClass;
  }
  //функция сброса стандартного поведения сабмита
  _preventDefaultForm(elements) {
    elements.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
  };

  //удаление ошибок в формах
  resetForms(form) {
    const arrForm = form.querySelectorAll(this._inputSelector);
    arrForm.forEach((el) => {
      const errorEl = form.querySelector(`#${el.name}-error`);
      this._hideError(el, errorEl);
    })
  }
  //возвращение формы
  _hideError(el, errorEl) {
    el.classList.remove(this._inputInvalidClass);
    errorEl.textContent = '';
  }

  //функция проверки формы на валидность
  _checkValidInput(element, error) {
    if (!element.validity.valid) {
      element.classList.add(this._inputInvalidClass);
      error.textContent = element.validationMessage;
    } else {
      this._hideError(element, error);
    }
  }

  disableBtn(form) {
    const btnElement = form.querySelector(this._submitBtnSelector);
    this._inactiveBtn(btnElement);
  }

  _inactiveBtn(btn) {
    btn.classList.add(this._inactiveBtnClass);
    btn.disabled = true;
  }

  //функция проверки кнопки
  _toggleBtn(invalid, button) {
    if (invalid) {
      button.classList.add(this._inactiveBtnClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._inactiveBtnClass);
      button.disabled = false;
    }
  }
  enableValidation() {
    const arrayForms = Array.from(document.querySelectorAll(this._formSelector));
    arrayForms.forEach((formElement) => {
      this._preventDefaultForm(formElement);
      //облась с импутами
      const formInputs = Array.from(formElement.querySelectorAll(this._inputSelector));
      //кнопки сохранить
      const buttonSubmit = formElement.querySelector(this._submitBtnSelector);
      //перебор всех инпутов
      formInputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          //ошибка
          const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
          //проверка на валидность
          const isFormInvalid = formInputs.some((inputElement) => !inputElement.validity.valid);
          this._checkValidInput(inputElement, errorElement);
          this._toggleBtn(isFormInvalid, buttonSubmit);
        })
      })
    })
  }
}

