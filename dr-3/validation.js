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
    this.userName = /\w+/;
    this.phone = /^\+\d\(\d{3}\)\d{3}\-\d{4}$/;
    this.email = /^\w+@\w+\.(ru)|(com)$/;
  }
}

class FormValidator {
  constructor (formSelector) {
    if (!(this.formEl = document.querySelector(formSelector))) console.log("can't get form", this.formEl);
    this.formEl.addEventListener('submit', evt => this.formSubmit(evt))
    this.templates = new ValidatorTemplates();
  }

  formSubmit(evt) {
    if (!this.validate()) {
      evt.preventDefault();
    }
  }

  validate(){
    for (const className in this.templates) {
      const el = document.querySelector('.' + className);

      let isInputCorrect = this.templates[className].test(el.value);

      if (isInputCorrect) {
        this.setValidField(el);
      } else {
      this.setInvalidField(el);
      }
    }
  }

  setValidField(inputEl) {
    inputEl.classList.remove('invalid');
    inputEl.classList.add('valid')
  }

  setInvalidField(inputEl) {
    inputEl.classList.remove('valid');
    inputEl.classList.add('invalid');
    alert('Неправильный ввод в поле: ' + inputEl.placeholder);

  }
}