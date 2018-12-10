class Product {
  constructor(id, title, price, img = 'https://placehold.it/200x150', containerSelector = '.product-group') {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
    this.cS = containerSelector;
    this._render();
  }
  _render() {
    let $wrapper = $('<div/>', {class: 'product'}),
      $img   = $('<img/>', {
        src: this.img,
        alt: 'img-alt'
      }),
      $desc  = $('<div/>', {class: 'desc'}),
      $name  = $('<p/>', {text: this.title}),
      $price = $(`<p>Цена: <span class="product-price">${this.price}</span> руб.`),
      $buyBtn = $('<button/>', {
        class: 'buyBtn',
        text: 'Купить',
        'data-id': this.id,
        'data-price': this.price,
        'data-name': this.title
      });
    // создание структуры
    $img.appendTo($wrapper);
    $name.appendTo($desc);
    $price.appendTo($desc);
    $buyBtn.appendTo($desc);
    $desc.appendTo($wrapper);
    $(this.cS).append($wrapper);
  }
}