let d = document,
   itemBox = d.querySelectorAll('.product__text'), // блок кожного товара
   cartCont = d.getElementById('cart_content'); // блок вивода даних корзини

// ОТримуємо дані з LocalStorage
function getCartData() {
   return JSON.parse(localStorage.getItem('cart'));
}
// Записываем данные в LocalStorage
function setCartData(o) {
   localStorage.setItem('cart', JSON.stringify(o));
   return false;
}
// Добавляем товар в корзину
function addToCart(e) {
   this.disabled = true; // блокируем кнопку на время операции с корзиной

   var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
      parentBox = this.parentNode, // родительский элемент кнопки "Добавить в корзину"
      parentWrapper = parentBox.parentNode,
      itemId = this.getAttribute('data-id'), // ID товара
      itemTitle = parentBox.querySelector('.product__title').innerHTML, // название товара
      itemPrice = parentBox.querySelector('.product__price span').innerHTML.match(/\d/g).join(''), // стоимость товара
      itemImg = parentWrapper.querySelector('.product__img img').getAttribute('src');

   if (cartData.hasOwnProperty(itemId)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
      cartData[itemId][2] += 1;
   } else { // если товара в корзине еще нет, то добавляем в объект
      cartData[itemId] = [itemTitle, itemPrice, 1, itemImg, itemId];
   }
   if (!setCartData(cartData)) { // Обновляем данные в LocalStorage
      this.disabled = false; // разблокируем кнопку после обновления LS
   }
   return false;
}
// Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"
for (var i = 0; i < itemBox.length; i++) {
   itemBox[i].querySelector('.product__btn').addEventListener('click', addToCart);
}
// Открываем корзину со списком добавленных товаров
function openCart(e) {
   var cartData = getCartData(), // вытаскиваем все данные корзины
      totalItems = '';
   // если что-то в корзине уже есть, начинаем формировать данные для вывода
   if (cartData !== null) {
      totalItems = '<ul class="popup-cart__list-cart">';
      for (var items in cartData) {
         let totalPriceGoods = cartData[items][1] * cartData[items][2];
         totalItems += '<li class="popup-cart__list-li">';
         totalItems += ' <div class="popup-cart__img-goods"><img src="' + cartData[items][3] + '" alt=""></div>';
         totalItems += '<div class="popup-cart__text-goods"><h5>' + cartData[items][0] + '</h5><p>Ціна - ' + cartData[items][1] + '/шт</p></div>';
         totalItems += '<div class="popup-cart__count">' + cartData[items][2] + '</div>';
         totalItems += '<div class="popup-cart__price-goods"><h5> Загалом </h5><p> ' + totalPriceGoods + ' $</p></div>';
         totalItems += '<a href="#header" class="popup-cart__delet" date-id="' + cartData[items][4] + '">X</a>';

         totalItems += '</li>';
      }
      totalItems += '</ul>';
      cartCont.innerHTML = totalItems;

   } else {
      // если в корзине пусто, то сигнализируем об этом
      cartCont.innerText = 'В корзине пусто!';
   }
   /* Видалити товар */
   d.querySelector('.popup-cart__delet').addEventListener('click', function (e) {
      let removeGoods = d.querySelector('.popup-cart__delet').getAttribute('date-id');
      console.log(localStorage.getItem('cart'));
      delete localStorage.getItem('cart').removeGoods;
   });
   document.querySelector('.popup-cart__count span').innerHTML = CountCart() + " товар";
   document.querySelector('.popup-cart__sum span').innerHTML = TotalPrice() + " $";
   return false;
}
function CountCart() {
   var cartData = getCartData();
   let countGoods = 0;
   if (cartData !== null) {
      for (var items in cartData) {
         countGoods += cartData[items][2];
      }
   }
   return countGoods;
}
function TotalPrice() {
   var cartData = getCartData();
   let Price = 0;
   if (cartData !== null) {
      for (var items in cartData) {
         Price += cartData[items][1] * cartData[items][2];
      }
   }
   return Price
}

/* Відкрити корзину */
d.getElementById('checkout').addEventListener('click', openCart);
/* Очистити корзину */
d.getElementById('clear_cart').addEventListener('click', function (e) {
   localStorage.removeItem('cart');
   cartCont.innerHTML = 'Корзина очишена.';
   document.querySelector('.popup-cart__count span').innerHTML = 0 + " товар";
   document.querySelector('.popup-cart__sum span').innerHTML = 0 + " $";
});


















