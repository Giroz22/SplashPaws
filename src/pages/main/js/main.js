import {generatorHeaderModal} from '../../../../main.js'
import {generatorFooter} from '../../../../main.js'


// import Swiper from 'swiper';

let swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


const header = document.querySelector("header")
const footer = document.querySelector("footer")


generatorHeaderModal(header,"Ingresar","../../login/html/login.html")

generatorFooter(footer)


// -------------------------

import texto, { consumirAPI } from "./funciones.js"


//Eventos
document.addEventListener("DOMContentLoaded", () => {
  consumirAPI(texto)
})

