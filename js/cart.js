const totalItems = document.getElementsByClassName("totalItems");
const totalProducts = document.getElementById('totalProducts');
// const cartWrapper = document.getElementById("cartWrapper");

let products = []; //al principio no tenemos productos elegidos

for (let i = 0; i < totalItems.length; i++){

  totalItems[i].innerHTML = "0"; //Necesitamos que antes de agregar productos, el contador dentro de Cart esté en 0.

}

const setCount = () => {

  let totalCount = 0; //arranca en 0 porque no tiene products
  //recorremos para ver si hay algo en products:

  for (const i in products) {
    
    totalCount += parseInt(products[i].count);

  }

  for (let i = 0; i < totalItems.length; i++){

    totalItems[i].innerHTML = totalCount; 

  } 

  return totalCount;

};

const totalPrice = () => {

  let totalCart = 0;
 
  for (const i in products) {
    let price = document.getElementById('totalLabPrice');
    totalCart += products[i].price * products[i].count;

  }
  // totalProducts.innerHTML = totalCart.toString();
  return totalCart;
};

// const productsList = () => {
//   //agrego el producto al cart
//   cartWrapper.innerHTML = products.map((product) => {
//     return `
//       <div class="cart-item">
//         <div class="cart-item-content">
//           <span>${product.product}</span>
//           <span>Cantidad deseada: ${product.count}</span>
//           </div>
//             <span> $ ${product.price}</span>
//         </div>
//       </div>
//     `;
//   });
// };

//el único momento en que llamamos esas 3 funciones de arriba, es cuando hacemos el onclick en los botones

const addProduct = (product, price, count) => {
  for (const i in products) {
    //chequeo si hay algo:
    if (products[i].product === product) {
      products[i].count++;
      setCount();
      totalPrice();
      // productsList();
      return;
    }
  }
  //si no hay nada, empiezo la lista:
  products.push({
    product,
    price,
    count
  });
  setCount();
  totalPrice();
  // productsList();
};

function totalClick(click){

  let totalClicks = document.getElementById('totalClicks');
  const sumValue = parseInt(totalClicks.innerText) + click;
  totalClicks.innerText = sumValue;

  if (sumValue < 0){

    totalClicks.innerText = 0;

  }

}

function addCustomProduct() {

  let formSerum = document.getElementById('formSerum'); // Referencia al form
  let price = formSerum.size.value; // El atributo value de las options del tamaño
  let name = formSerum.base.value + " Serum " + formSerum.effect.value;
  let amount = document.getElementById('totalClicks').innerHTML; 
  console.log(amount)

  for(let i = 0; i < amount; i ++){

    addProduct(name, price, 1);

  }

}

function changeProduct(){

  const form = document.getElementById('formSerum');
  const radios = form.size;
  const selector = document.querySelectorAll('select');
  const title = document.getElementById('productTitle');
  const total = document.getElementById('totalLabPrice');
  // let amount = document.getElementById('totalClicks').innerHTML;
  let selected = selector.option;

  for(selected of selector){
  
    selected.onclick = (e) => {
  
      title.innerHTML = e.target.value + " Serum"
      // console.log(e.target.value);
  
    }
  
  }
  
  for (const radio of radios){
  
    radio.onclick = (e) => {

      let price = e.target.value
      total.innerHTML = price;

    }
  
  }

}

changeProduct();