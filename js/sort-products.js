const formFilter = document.getElementById('formFilter');
const product = document.getElementsByClassName("productSort");

formFilter.addEventListener("change", updateFilter);

function updateFilter() {

    resetFilter();

    let productChosen = document.getElementsByClassName(formFilter.typeSerum.value)

    for(let i = 0; i < product.length; i++){

        if(!(product[i].classList.contains(formFilter.typeSerum.value))){

            product[i].classList.add("is-active")

        }

    }

}

function resetFilter(){

    for(let i = 0; i < product.length; i++){

        product[i].classList.remove("is-active");

    }

}