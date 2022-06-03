const totalItems = document.getElementsByClassName("totalItems"); //Declaro donde se mostrará los ítems totales (Cart en el nav)
const cartProductContainer = document.getElementById('cartProductContainer'); //Declaro donde se mostrarán los productos (Cart)
const emptyCartContainer = document.getElementById('emptyCart'); //Declaro el contenedor de la alerta de carrito vacío
let products = []; //Creamos un array el cual guardará todos los ítems

document.addEventListener('DOMContentLoaded', () => {

  if (localStorage.getItem('products')) {

    products = JSON.parse(localStorage.getItem('products'))
    setCount();
    productsList();

  }

})

//Con esta función se hará la cuenta de cuántos ítems hay en total en toda la página.
const setCount = () => {

  let totalCount = 0; //Se iniciará en 0, puesto que por defecto no habrá items dentro del Cart.

  //Se recorre products para ver si hay productos dentro de este y así actualizar totalCount.
  for (const i in products) {

    totalCount += parseInt(products[i].count);

  }

  //Se actualiza la cantidad de productos en (Cart).
  for (let i in totalItems) {

    totalItems[i].innerHTML = totalCount;

  }

  //Se regresa totalCount hacia la función que lo necesite.
  return totalCount;

};

//Con esta función se hará la cuenta del precio total de la suma de los ítems en toda la página.
const totalPrice = () => {

  let totalCart = 0; //Se iniciará en 0, puesto que por defecto no habrá items dentro del Cart, por ende el valor será 0.

  //Se recorre products y se actualiza el precio, tal que corresponda con la cantidad.
  for (const i in products) {

    totalCart += products[i].price * products[i].count; //Se asigna el precio total a la variable totalCart
  }
  //Se regresa totalCart hacia la función que lo necesita.
  return totalCart;
};

const productsList = () => {

  //agrego el producto al cart

  try {
    cartProductContainer.innerHTML = products.map((product) => {
      let productPrice = product.count * product.price; // Precio * canitdad = precio total por item
      return `
        <div class="cart-product">
        <img src="./assets/img/product-default.png">
          <div class="cart-product-content">
            <p class="cart-product-name">${product.product}</p>
            <p class="cart-product-total-price">${product.count} x <span> $ ${productPrice}</span></p>
          </div>
          <button onclick="deleteProduct('${product.product}')">Delete Item</button>
        </div>
      `;
    }).join('');
    
    if (products.length === 0) {
  
      emptyCartContainer.classList.remove('is-active');
  
    } else {
  
      emptyCartContainer.classList.add('is-active');
  
    }
  } catch {
  }
  
  localStorage.setItem('products', JSON.stringify(products))
  setCount();

};

//Con esta función se construye el producto, se le debe proporcionar 3 datos, el nombre del producto, el precio y la cantidad.
const addProduct = (product, price, count) => {

  //Declaro setProduct
  let setProduct = {

    product: product,
    price: price,
    count: count,

  }

  //Se recorre products y se verifica la existencia de los productos.
  for (const i in products) {

    //Si un producto ya existe, la cantidad de este sube 1. Se llama finalmente a setCount() y a totalPrice().
    if (products[i].product === setProduct.product) {

      products[i].count++;
      setCount();
      totalPrice();
      productsList();

      return;

    }

  }

  //Se recorre products y se verifica la existencia de los productos, en el caso de no existir productos, se crea uno.
  products.push(setProduct);

  //Se llama a setCount() a totalPrice() y a productsList().
  setCount();
  totalPrice();
  productsList();
};

function deleteProduct(item) {

  for (const i in products) {

    if (item === products[i].product) {

      const index = products.indexOf(item);
      products.splice(index, 1)
      productsList()

    }

  }

}

//Con esta función se calcula la cantidad de clicks para conocer la cantidad que se quiere de un producto. Se le otorga como
//parámetro la cantidad de clicks que da el botón en cada on click.
function totalClick(click) {

  let totalClicks = document.getElementById('totalClicks'); //Declaro totalClicks que será donde se mostrará el contador.
  const sumValue = parseInt(totalClicks.innerText) + click; //Declaro sumValue el cual es igual a el contador de totalClicks + (y actualizandose) cada click
  totalClicks.innerText = sumValue; // Finalmente totalClicks es igual a sumValue

  //Si sumValue es menor que 0, el contador deberá ser 0. No se permiten valores negativos.
  if (sumValue < 0) {

    totalClicks.innerText = 0;

  }

  //Se llama a totalUpdate() para actualizar en tiempo real el precio de los productos en la página The Lab
  totalUpdate();

}

//Con esta función se añade un producto customizado de la pestaña de The Lab
function addCustomProduct() {

  let formSerum = document.getElementById('formSerum'); //Declaro el objeto form
  let effect = formSerum.effect.value; // Declaro effect como el value que tiene el input effect dentro del form
  let price = formSerum.size.value; // Declaro price como el value que tiene el input size dentro del form
  let base = formSerum.base.value; // Declaro base como el value que tiene el input base dentro del form
  let amount = document.getElementById('totalClicks').innerHTML; //Declaro que la cantidad, es decir amount, es igual a totalClicks
  let size;

  if (price == 12.99) {

    size = "250ml"

  } else if (price == 10.99) {

    size = "170ml"

  } else {

    size = "120ml"

  }

  let name = effect + " " + base + " Serum " + " " + size; // Declaro que el nombre del producto es igual al value del input base + "Serum" + el efecto del producto

  //Se itera este for según la cantidad de elementos, y se agrega a cada uno por separado.
  for (let i = 0; i < amount; i++) {

    addProduct(name, price, 1);

  }

}

//Con esta función se actualiza el precio total en The Lab automáticamente cada vez que un valor cambie
//Valores como la cantidad y el tamaño del producto.
function totalUpdate() {
  const total = document.getElementById('totalLabPrice'); //Declaro donde se mostará el total
  const form = document.getElementById('formSerum'); //Declaro el objeto form

  let price = form.size.value; //Declaro price como el value del input size dentro del form
  let totalCost = document.getElementById('totalClicks').innerHTML * price; //Declaro totalCost como la cantidad de clicks totales multiplicado por el precio del producto
  total.innerHTML = "$" + totalCost; //Finalmente declaro que total es igual a totalCost

  //Si el costo es 0 (Ya que aún no se seleccionó la cantidad) el innerHTML de total será vacío para no generar confusiones.
  if (totalCost == 0) {

    total.innerHTML = "";

  }

}

//Con esta función se actualiza en tiempo real el form, actualizando el nombre del producto en el html, y el precio total segun la cantidad y el tamaño del producto.
function updateForm() {
  
  const form = document.getElementById('formSerum'); //Declaro el objeto form
  const radios = form.size; //Declaro radios como cada uno de los input radios existentes
  const selector = document.querySelectorAll('select'); //Declaro selector como el input tipo select
  const title = document.getElementById('productTitle'); //Declaro title como el título del producto en el html
  let selected = selector.option; //Declaro selected como opción dentro de selector

  //Se recorre un for en selector por cada selected que tenga
  for (selected of selector) {

    //Se crea un event listener para el selector
    selected.onclick = (e) => {

      title.innerHTML = e.target.value + " Serum"; //El título del producto es igual al value de selected (opción del selector) + "Serum"

    }

  }

  //Se recorre un for en radios por cada input radio que exista
  for (const radio of radios) {

    //Se crea un event listener para el input radio
    radio.onclick = (e) => {

      totalUpdate(); //Se llama a la función totalUpdate()

    }

  }

}

try{
  const foo = document.getElementById('formSerum'); 
  updateForm();
}
catch{
}