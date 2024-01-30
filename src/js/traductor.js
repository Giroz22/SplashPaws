import { traducirEspañol, traducirIngles } from "../../main";

export function TraducirPagina() {
  const textoTraducir = document.querySelectorAll("h1,p,a");
  const isEnglish = localStorage.getItem("isEnglish");

  if (isEnglish) {
    textoTraducir.forEach((element) => {
      traducirEspañol(element.textContent).then((texto) => {
        element.textContent = texto;
      });
    });
    localStorage.removeItem("isEnglish");
  } else {
    textoTraducir.forEach((element) => {
      traducirIngles(element.textContent).then((texto) => {
        element.textContent = texto;
      });
    });
    localStorage.setItem("isEnglish", true);
  }
}

export function UtilizarIdiomaActual() {
  console.log("Hola");

  const textoTraducir = document.querySelectorAll("h1,p,a,button");
  const isEnglish = localStorage.getItem("isEnglish");

  if (!isEnglish) {
    textoTraducir.forEach((element) => {
      traducirEspañol(element.textContent).then((texto) => {
        element.textContent = texto;
      });
    });
    localStorage.removeItem("isEnglish");
  } else {
    textoTraducir.forEach((element) => {
      traducirIngles(element.textContent).then((texto) => {
        element.textContent = texto;
      });
    });
    localStorage.setItem("isEnglish", true);
  }
}
