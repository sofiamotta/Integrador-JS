
function totalClick(click) {

    let totalClicks = document.getElementById('totalClicks'); //Declaro totalClicks que será donde se mostrará el contador.
    const sumValue = parseInt(totalClicks.innerText) + click; //Declaro sumValue el cual es igual a el contador de totalClicks + (y actualizandose) cada click
    totalClicks.innerText = sumValue; // Finalmente totalClicks es igual a sumValue
  
    if (sumValue < 0) {
  
      totalClicks.innerText = 0;
  
    }
  
    totalUpdate();
  
  }

function updateForm() {

    const form = document.getElementById('formSerum'); //Declaro el objeto form
    const radios = form.size; //Declaro radios como cada uno de los input radios existentes
    const selector = document.querySelectorAll('select'); //Declaro selector como el input tipo select
    const title = document.getElementById('productTitle'); //Declaro title como el título del producto en el html
    let selected = selector.option; //Declaro selected como opción dentro de selector
  
    for (selected of selector) {
  
      selected.onclick = (e) => {
  
        title.innerHTML = e.target.value + " Serum"; //El título del producto es igual al value de selected (opción del selector) + "Serum"
  
      }
  
    }
  
    for (const radio of radios) {
  
      radio.onclick = (e) => {
  
        totalUpdate(); //Se llama a la función totalUpdate()
  
      }
  
    }
  
  }
  
  function totalUpdate() {
    const total = document.getElementById('totalLabPrice'); //Declaro donde se mostará el total
    const form = document.getElementById('formSerum'); //Declaro el objeto form
  
    let price = form.size.value; //Declaro price como el value del input size dentro del form
    let totalCost = document.getElementById('totalClicks').innerHTML * price; //Declaro totalCost como la cantidad de clicks totales multiplicado por el precio del producto
    total.innerHTML = "$" + totalCost; //Finalmente declaro que total es igual a totalCost
  
    if (totalCost == 0) {
  
      total.innerHTML = "";
  
    }
  
  }
  
  updateForm();