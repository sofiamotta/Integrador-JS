// Declaración de variables para product slider
let product = document.getElementsByClassName("product");
let position = document.getElementsByClassName("position");
let place = new Array(position.length);

// Código product slider
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