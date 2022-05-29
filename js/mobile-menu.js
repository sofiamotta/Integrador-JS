// Declaración de variables para menu mobile
const mobile_btn_open = document.querySelector('.mobile-hamb-open');
const mobile_btn_close = document.querySelector('.mobile-hamb-close');
const mobile_menu = document.querySelector('.mobile-hamb-menu');

// Código menu mobile
mobile_btn_open.addEventListener('click', function() {
    mobile_btn_open.classList.add('is-active');
    mobile_menu.classList.add('is-active');
})

mobile_btn_close.addEventListener('click', function() {
    mobile_menu.classList.remove('is-active');
})