// Declaración de variables para item slider
let product = document.getElementsByClassName("product");
let position = document.getElementsByClassName("position");
let place = new Array(position.length);

// Declaración de variables para menu mobile
const mobile_btn_open = document.querySelector('.mobile-hamb-open');
const mobile_btn_close = document.querySelector('.mobile-hamb-close');
const mobile_menu = document.querySelector('.mobile-hamb-menu');

// Declaración de variables para selección de item en The Lab
const btn_serum = document.querySelector('.btn-serum');
const btn_cream = document.querySelector('.btn-cream');
const serum = document.querySelector('.serum');
const cream = document.querySelector('.cream');

// Código item slider
start();
function start() {
    for (let i = 0; i < position.length; i++) { 
        position[i].innerHTML = product[i].innerHTML;
        place[i] = i;
    }
}
function foward() {
    for (let i = 0; i < position.length; i++) {
        place[i] = next(place[i])
        position[i].innerHTML = product[place[i]].innerHTML;
    }
}
function backwards(){
    for(let i = 0; i < position.length; i ++){
        place[i] = back(place[i]);
        position[i].innerHTML = product[place[i]].innerHTML;
    }
}
function back(number){
    if(number == 0){
        return (product.length -1);
    }
    number = number - 1;
    return number;

}

function next(number){
if(number == product.length - 1){
    return 0;
}
number = number + 1;
return number;

}

// Código menu mobile
mobile_btn_open.addEventListener('click', function() {
    mobile_btn_open.classList.add('is-active');
    mobile_menu.classList.add('is-active');
})

mobile_btn_close.addEventListener('click', function() {
    mobile_menu.classList.remove('is-active');
})

btn_serum.addEventListener('click', function() {
    serum.classList.add('is-active');
    cream.classList.add('is-inactive');
    console.log("SERUM");
})

btn_cream.addEventListener('click', function() {
    cream.classList.add('is-active');
    serum.classList.add('is-inactive');
    console.log("CREAM");
})