// import Swiper from 'swiper';

swiper = new Swiper(".mySwiper", {
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


generatorHeaderModal(header,"Tienda","Contactos","#","#","Ingresar","#")

generatorFooter(footer)
