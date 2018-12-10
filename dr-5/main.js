// 1. Написать метод удаления товара из корзины
jQuery(function ($) {
  // Товары
  let product_1 = new CatalogProduct(123, 'Ноутбук', 45600),
    product_2 = new CatalogProduct(456, 'Мышь', 1000),
    product_3 = new CatalogProduct(789, 'Клавиатура', 1400);
  // корзина
  let cart = new Cart('getCart.json');
  // Добавление товара
  $('.buyBtn').click(e => {
    cart.addProduct((e.target));
  })

});