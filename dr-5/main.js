// 1. Написать метод удаления товара из корзины
jQuery(function ($) {
  // Товары
  new CatalogProduct(123, 'Ноутбук', 45600);
  new CatalogProduct(456, 'Мышь', 1000);
  new CatalogProduct(789, 'Клавиатура', 1400);
  // корзина
  const myCart = new Cart('getCart.json');
  // Добавление товара
  $('.buyBtn').click(e => {
    myCart.addProduct(e.target);
  });


});