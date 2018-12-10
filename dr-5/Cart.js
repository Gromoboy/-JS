class Cart {
  constructor(source,
              containerSelector = '#cart') {
    this.source = source;
    this.containerSelector = containerSelector;
    this.countGoods = 0;
    this.amount = 0;
    this.cartItems = [];
    this._init()
  }
  _init() {
    this._render();
    fetch(this.source)
      .then(response => response.json())
      .then(data => {
        for (let product of data.content) {
          this.cartItems.push(product);
          this._renderItem(product);
        }
        this.countGoods = data.countGoods;
        this.amount = data.amount;
        this._updateTotalView();
      })
  }
  _render() {
    let $cartItemsDiv = $('<div/>', {class: 'cart-item-group'});
    let $totalGoods = $('<div/>', {class: 'cart-summary '});
    $totalGoods.append($('<p>Всего товаров в корзине: </p><p class="sum-goods"> 0 шт.</p> '));
    let $totalPrice = $('<div/>', {class: 'cart-summary '});
    $totalPrice.append($('<p>Общая стоимость: </p><p class="sum-price"> 0 руб.</p> '));

    const $container = $(this.containerSelector);
    $container.text('Корзина');
    $cartItemsDiv.appendTo($container);
    $totalGoods.appendTo($container);
    $totalPrice.appendTo($container);
  }
  _renderItem(product) {
    let $container = $('<div/>', {
      class: 'cart-item',
      'data-product': product.id_product
    });
    $container.append($(`<p class="product-name">${product.product_name}</p>`));
    $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
    $container.append($(`<p class="product-price">${product.price} руб.</p>`));
    $container.append($('<p class="close">&times;</p>'));
    $container.appendTo($('.cart-item-group'));
    // TODO: add to container 'close' event
    $container.find('.close').click(e => {
      this._removeItem(product.id_product);
    });

  }
  _updateTotalView() {
    $('.sum-goods').text(`${this.countGoods} шт.`);
    $('.sum-price').text(`${this.amount} руб.`);
  }
  _updateCartItemView(product) {
    let $container = $(`div[data-product = "${product.id_product}"]`);
    $container.find('.product-quantity').text(product.quantity);
    $container.find('.product-price').text(`${product.price * product.quantity}`);
  }
  addProduct(prodBoxBtnEl) {
    let $buyingProdEl = $(prodBoxBtnEl);
    let sameProductInCart = this.cartItems.find(item => item.id_product === +$buyingProdEl.data('id'));
    if (sameProductInCart) {
      sameProductInCart.quantity++;
      this.countGoods++;
      this.amount += sameProductInCart.price;
      this._updateCartItemView(sameProductInCart);
    } else {
      let product = {
        id_product: +$buyingProdEl.data('id'),
        price:      +$buyingProdEl.data('price'),
        product_name:$buyingProdEl.data('name'),
        quantity:    1
      };
      this.cartItems.push(product);
      this.amount += product.price;
      this.countGoods++;
      this._renderItem(product);
    }
    this._updateTotalView();
  }
  _removeItem(productId) {
    const lookingProduct = this.cartItems.find(item => item.id_product === +productId);
    if (!lookingProduct) return;
    if (lookingProduct.quantity > 1 ) {
      lookingProduct.quantity--;
      this.countGoods--;
      this.amount -= lookingProduct.price;
      this._updateCartItemView(lookingProduct);
    } else {

    }
    this._updateTotalView();
  }

}