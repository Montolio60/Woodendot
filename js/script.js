let products = [
   {
      id: 10001,
      name: "Cloe",
      subName: "Modular Storage System",
      price: 1.176,
      description: "An expansive way to furnish your space exactly how you need it and like it. Transform it in exactly what you need like a bookshelf, tv stand or show rack, you pick.",
      img: "img/cloe.png"
   },
   {
      id: 10002,
      name: "Pelican",
      subName: "Modular bedside table & shelf",
      price: 89,
      description: "Store or exhibit your favorite objects in the entrance hall, modern hallways, living rooms and bedrooms with a decorative and minimalist touch.",
      img: "img/Pelican.png"
   },
   {
      id: 10003,
      name: "Alada",
      subName: "Floating folding desk",
      price: 534,
      description: "A timeless and discreet folding desk that seamlessly transforms into a decorative shelf in seconds.",
      img: "img/Alada.png"
   },
   {
      id: 10004,
      name: "Alba Collection",
      subName: "Modular bedside table & shelf",
      price: 272,
      description: "A versatile and modular piece with a sculptural touch that can be used as a wall shelf or as a bedside table with concealed storage.",
      img: "img/AlbaCollection.png"
   },
   {
      id: 10005,
      name: "Batea Collection",
      subName: "Tables with storage & tray tables",
      price: 272,
      description: "Composed of clean and rounded lines, the Batea Collection includes unique tables with extra functionality like a removable tray, and hidden storage.",
      img: "img/BateaCollection.png"
   }
]

//отрисовка продуктов 

function renderProduct() {
   const mainBlock = document.querySelector('.block-product__wrapper');
   products.forEach(goods => {
      const product = document.createElement('div');
      const productWrapper = document.createElement('div');
      const productText = document.createElement('div');
      const productImg = document.createElement('div');
      const picture = document.createElement('img');
      const productTitle = document.createElement('h3');
      const productSubtitle = document.createElement('h5');
      const productPrice = document.createElement('div');
      const paragraph = document.createElement('p');
      const productBtn = document.createElement('div');
      productBtn.innerHTML = `<button class = "product__btn" data-id = "` + goods.id + `">Shop now</button>`;

      product.className = "product";
      productWrapper.className = "product__wrapper";
      productText.className = "product__text";
      productImg.className = "product__img";
      productTitle.className = "product__title";
      productSubtitle.className = "product__subtitle";
      productPrice.className = "product__price";

      picture.src = goods.img;
      productTitle.innerText = goods.name;
      productSubtitle.innerText = goods.subName;
      productPrice.innerHTML = "From <span> $" + goods.price + "</span>";
      paragraph.innerText = goods.description;


      product.append(productWrapper);
      productWrapper.append(productText, productImg)
      productImg.append(picture);
      productText.append(productTitle, productSubtitle, productPrice, paragraph, productBtn)

      mainBlock.append(product);
   });


   return mainBlock;
};

renderProduct();

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


