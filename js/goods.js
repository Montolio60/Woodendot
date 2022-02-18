let products = [
   {
      id: 10001,
      name: "Cloe",
      subName: "Modular Storage System",
      price: 1176,
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
      const productBtn = document.createElement('button');
      

      product.className = "product";
      productWrapper.className = "product__wrapper";
      productText.className = "product__text";
      productImg.className = "product__img";
      productTitle.className = "product__title";
      productSubtitle.className = "product__subtitle";
      productPrice.className = "product__price";
      productBtn.className = "product__btn";

      picture.src = goods.img;
      productTitle.innerText = goods.name;
      productSubtitle.innerText = goods.subName;
      productPrice.innerHTML = "From <span> $" + goods.price + "</span>";
      paragraph.innerText = goods.description;
      productBtn.innerText = "Shop now";
      productBtn.setAttribute('data-id' , goods.id);


      product.append(productWrapper);
      productWrapper.append(productText, productImg)
      productImg.append(picture);
      productText.append(productTitle, productSubtitle, productPrice, paragraph, productBtn)

      mainBlock.append(product);
   });


   return mainBlock;
};

renderProduct();
