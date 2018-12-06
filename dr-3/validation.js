// 3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».

// ** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:

// - Имя содержит только буквы;

// ** - Телефон подчиняется шаблону +7(000)000-0000;**

// ** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**

// ** - Текст произвольный;**
// ** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной рамкой
// и сообщать пользователю об ошибке.**

class ValidatorTemplates {
  constructor() {
    this.userName = /^([a-z]+)|([йцукенгшщзхъфывапролджэячсмитьбю]+)$/i;
    this.phone = /^\+\d\(\d{3}\)\d{3}\-\d{4}$/;
    this.email = /^\w+@\w+\.(ru)|(com)$/;
  }
}

class ErrorMessages {
  constructor() {
    this.userName = 'Имя должно содержать только буквы';
    this.phone    = 'Телефон должен подчинятся шаблону +7 (000)000-0000 !';
    this.email    = 'E-mail должен выглядеть как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru';

  }
}

class FormValidator {
  constructor (formSelector, templates = new ValidatorTemplates(), errors = new ErrorMessages()) {
    if (!(this.formEl = document.querySelector(formSelector))) console.log("can't get form", this.formEl);
    this.formEl.addEventListener('submit', evt => this.formSubmit(evt))
    this.templates = templates;
    this.errorMsgs = errors;
  }

  formSubmit(evt) {
    if (!this.validate()) {
      evt.preventDefault();
    }
  }

  validate(){
    for (const errorClass in this.templates) {
      const el = document.querySelector('.' + errorClass);

      let isInputCorrect = this.templates[errorClass].test(el.value);

      if (isInputCorrect) {
        this.setValidField(el);

      } else {
      this.setInvalidField(el);
      this.addErrorMessage(el, errorClass);
      }
    }
  }

  addErrorMessage(el, className) {
    if (el.parentElement.getElementsByClassName('error-hint').length ) return;

    let errorEl = document.createElement('div');
    errorEl.classList.add('error-hint')
    errorEl.innerHTML = this.errorMsgs[className];
    el.parentElement.appendChild(errorEl);
  }

  setValidField(inputEl) {
    inputEl.classList.remove('invalid');
    inputEl.classList.add('valid')
  }

  setInvalidField(inputEl) {
    inputEl.classList.remove('valid');
    inputEl.classList.add('invalid');
    //alert('Неправильный ввод в поле: ' + inputEl.placeholder);

  }
}
// 2) В форму обратной связи добавить возможность выбора города обращения.
// Сам список должен загружаться после загрузки страницы через AJAX.