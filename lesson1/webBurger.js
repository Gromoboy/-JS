class Param {
  constructor(elem) {
    this.name = elem.value;
    this.price = +elem.dataset['price'];
    this.cal = +elem.dataset['cal'];
  }
}

class WebBurger {
  constructor(sizeInpName, stuffingInpName,toppingInpName) {
    this.size = new Param(this._getSelected(sizeInpName));
    this.stuff = new Param(this._getSelected(stuffingInpName));
    this.toppings = this._getToppingsParams(toppingInpName);
  }

  _getToppingsParams(toppingsInpName) {
    let toppingsParams= [];
    this._getSelectedAll(toppingsInpName).forEach(el => toppingsParams.push(new Param(el)));
    return toppingsParams;
  }

  _getSelectedAll(inpName) {
    return document.querySelectorAll(`input[name="${inpName}"]:checked`);
  }

  _getSelected(inpName) {
    return document.querySelector(`input[name="${inpName}"]:checked`);
  }

  _getTotalPrice() {
    let result = this.size.price + this.stuff.price;
    this.toppings.forEach(el => result += el.price );
    return result;
  }
  _getTotalCal() {
    return this.size.cal + this.stuff.cal +
      this.toppings.map(params => params.cal).reduce((total, cur) => total + cur);
  }

  showTotal(priceElId, calElId) {
    document.getElementById(priceElId).textContent = this._getTotalPrice();
    document.getElementById(calElId).textContent = this._getTotalCal();
  }
}