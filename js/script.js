let d = document,
   itemBox = d.querySelectorAll('.product__text'), // блок каждого товара
   cartCont = d.getElementById('cart_content'); // блок вывода данных корзины

// Получаем данные из LocalStorage
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

   console.log(itemImg);
   if (cartData.hasOwnProperty(itemId)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
      cartData[itemId][2] += 1;
   } else { // если товара в корзине еще нет, то добавляем в объект
      cartData[itemId] = [itemTitle, itemPrice, 1, itemImg];
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
         totalItems += '<div class="popup-cart__price-goods">' + totalPriceGoods + '$</div>';
         totalItems += '<a href="" class="popup-cart__delet">X</a>';
         console.log()
         //<div class="popup-cart__price-goods">1.176 грн</div>

         totalItems += '</li>';
      }
      totalItems += '</ul>';
      cartCont.innerHTML = totalItems;
   } else {
      // если в корзине пусто, то сигнализируем об этом
      cartCont.innerText = 'В корзине пусто!';
   }
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

/* Открыть корзину */
d.getElementById('checkout').addEventListener('click', openCart);
/* Очистить корзину */
d.getElementById('clear_cart').addEventListener('click', function (e) {
   localStorage.removeItem('cart');
   cartCont.innerHTML = 'Корзина очишена.';
   document.querySelector('.popup-cart__count span').innerHTML = 0 + " товар";
   document.querySelector('.popup-cart__sum span').innerHTML = 0 + " $";
});



/*<ul class="popup-cart__list-cart">
                        <li>
                           <div class="popup-cart__img-goods"><img src="img/cloe.png" alt=""></div>
                           <div class="popup-cart__text-goods"><h5>Cloe</h5><p>Ціна - 1.176/шт</p></div>
                           <form action="" class="counter">
                              <button name="decrease">-</button>
                              <input name="value" type="number" value="5"  style="text-align: center;">
                              <button name="increase">+</button>
                           </form>
                           <div class="popup-cart__price-goods">1.176 грн</div>
                           <a href="" class="popup-cart__delet">X</a>
                        </li>
                     </ul> */
/*

//отрисовка продуктов 


// Корзина 

let Cart = {};

document.onclick = event => {
   if (event.target.classList.contains('product__btn')) {
      plusFunction(event.target.dataset.id);
   }
};
// Додавання товару в корзину 
const plusFunction = id => {
   Cart[id]++;
   clearCart();
   renderCart();
   clearCount();
   countingGoods();
};

// Отрисовка корзини 
const renderCart = () => {

   const cartContent = document.querySelector('.popup-cart__content');
   let masKey = Object.keys(Cart);
   let basket;
   let basketMas = [];

   for (index = 0; index < masKey.length; ++index) {
      basket = products.find(prod => prod.id == masKey[index]);
      basketMas.push(basket);
   }
   basketMas.forEach(bask => {

      const popupCartList = document.createElement('li');
      const popupCartImgGoods = document.createElement('div');
      const popupCartImg = document.createElement('img');
      const popupCartTextGoods = document.createElement('div');
      const popupCartTextName = document.createElement('h5');
      const popupCartTextPrice = document.createElement('p');
      const counterForm = document.createElement('form');
      const counterFormButtonMinus = document.createElement('button');
      const counterFormButtonPlus = document.createElement('button');
      const counterFormInput = document.createElement('input');
      const popupCartPrice = document.createElement('div');
      const buttonClose = document.createElement('a');

      popupCartImgGoods.className = "popup-cart__img-goods";
      popupCartList.className = "popup-cart__list-li";
      popupCartTextGoods.className = "popup-cart__text-goods";
      buttonClose.className = "popup-cart__delet";
      counterForm.className = "counter";
      popupCartPrice.className = "popup-cart__price-goods";

      popupCartImg.src = bask.img;
      popupCartTextName.innerText = bask.name;
      popupCartTextPrice.innerHTML = "Ціна " + bask.price + " $";
      buttonClose.innerText = "X";
      counterFormButtonMinus.name = "decrease";
      counterFormButtonMinus.innerText = "-";
      counterFormButtonPlus.name = "increase";
      counterFormButtonPlus.innerText = "+";
      counterFormInput.name = "value";
      counterFormInput.type = "number";
      counterFormInput.value = "1";

   
      //popupCartPrice.innerText = + "$";

      cartContent.append(popupCartList);
      popupCartImgGoods.append(popupCartImg);
      popupCartTextGoods.append(popupCartTextName, popupCartTextPrice);
      counterForm.append(counterFormButtonMinus, counterFormInput, counterFormButtonPlus);
      popupCartList.append(popupCartImgGoods, popupCartTextGoods, counterForm, popupCartPrice, buttonClose);
   });
   document.querySelector('.counter').onsubmit = function(evt){
      evt.preventDefault();
   }
   console.log(basketMas);
   return cartContent;
}

//Очистка корзини

const clearCart = () => {
   const clearBask = document.querySelector('.popup-cart__list-li');
   if (clearBask) {
      clearBask.remove();
   }
}


*/

//Количество товаров в корзине 

const countingGoods = () => {
   let count = 0;
   for (let key in Cart) {
      count++
   }
   const CartEl = document.querySelector('.header__cart');
   const cartSpan = document.createElement('span');
   cartSpan.className = "Count-goods";

   cartSpan.innerText = count;

   CartEl.append(cartSpan);
   return CartEl;
}
const clearCount = () => {
   const countGoods = document.querySelector('.Count-goods');
   if (countGoods) {
      countGoods.remove();
   }
}















function makeCounter(formEl) {
   const decreaseBtn = formEl.elements.decrease;
   const increaseBtn = formEl.elements.increase;
   const valueEl = formEl.elements.value;

   let value = parseInt(valueEl.value, 10) || 0;

   function increase() {

      setValue(++value);

   }
   function decrease() {
      setValue(--value)

   }
   function setValue(newValue) {
      console.log({ newValue });
      value = Math.max(newValue, 1);

      valueEl.value = value.toString();
   }

   decreaseBtn.addEventListener('click', decrease);
   increaseBtn.addEventListener('click', increase);
   formEl.addEventListener('submit', e => e.preventDefault());
   valueEl.addEventListener('input', function () {
      value = parseInt(valueEl.value, 10);
   });

   return {

      getValue() {
         return value;
      },
      setValue

   };

}
const counters = [];
Array.from(document.querySelectorAll('.counter')).map(formEl => {
   counters.push(makeCounter(formEl));
});


