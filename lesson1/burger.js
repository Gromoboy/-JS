'use strict';
'esversion: 6';

// ** - маленький (50 рублей, 20 калорий);**
// - большой (100 рублей, 40 калорий).
// Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ** - сыром (+ 10 рублей, + 20 калорий);**
// ** - салатом (+ 20 рублей, + 5 калорий);**
// - картофелем (+ 15 рублей, + 10 калорий).
//
// *Дополнительно гамбургер можно посыпать приправой (+ 15 рублей, 0 калорий)
// и полить майонезом (+ 20 рублей, + 5 калорий). *
//
// Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
// Используйте ООП-подход (подсказка: нужен класс Гамбургер, константы,
// методы для выбора опций и расчета нужных величин).

class Hamburger {


  constructor(size, stuffing) {
    this._size = size;
    this._stuffing = stuffing;
    this._toppings = [];

    this.SIZES = {
      small: {price: 50, cal: 20},
      large: {price: 100, cal: 40},
    };

    this.STUFFINGS = {
      cheese: {price: 10, cal: 20},
      salad: {price: 20, cal: 5},
      potato: {price: 15, cal: 10}
    }

    this.TOPPINGS = {
      mayo: {price:20, cal:5},
      spice: {price:15, cal:0}
    }

  }

  calcPrice() {

    return this.SIZES[this._size].price + this.getStuffingsPrice() + this.getToppingsPrice();
  }
  getStuffingsPrice() {

    let price = this._stuffing.map((stuff) => {

      return this.STUFFINGS[stuff].price;
    }).reduce((acc, curr) => acc + curr);

    return Number.isNaN(price) ? 0 : price;
  }

  getToppingsPrice() {
    if (this._toppings.length === 0) return 0;

    let price = this._toppings.map((topping) => {

      return this.TOPPINGS[topping].price;
    }).reduce((acc, curr) => acc + curr);

    return Number.isNaN(price) ? 0 : price;
  }

  calcCalories() {
    return this.SIZES[this._size].cal + this.getStuffingsCalories() + this.getToppingsCalories();
  }

  getStuffingsCalories() {
    let calories = this._stuffing.map((stuffing) => this.STUFFINGS[stuffing].cal).reduce((acc, curr) => acc + curr);
    return Number.isNaN(calories) ? 0 : calories;
  }


  getToppingsCalories() {
    if (this._toppings.length === 0) return 0;

    let calories = this._toppings.map( (topping) => this.TOPPINGS[topping].cal ).reduce((acc, curr) => acc + curr);

    return Number.isNaN(calories) ? 0 : calories;
  }

  addTopping(topping) {
    if (this._toppings.includes(topping)) return;
    this._toppings.push(topping);
  }

  removeTopping(topping) {
    if ( this._toppings.includes(topping) ) this._toppings.pop(topping);
  }
}