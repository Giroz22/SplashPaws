//Importaciones
import * as formBase from "./componentes/formBase.js";

//=====Modal=====
//Contenedor modal
const modal = document.getElementById("servicioModal");
const form = document.getElementById("formServicio");
const btnCerrar = modal.querySelector(".btn-close");

// Eventos
btnCerrar.addEventListener("click", () => {
  limpiarFormBase();
});

export function crearBaseFormServicio(textoTitulo, listaInputs, listaBtns) {
  const titulo = modal.querySelector("#servicioModalLabel");
  const modalBody = modal.querySelector(".modal-body");
  const modalFooter = modal.querySelector(".modal-footer");

  titulo.textContent = textoTitulo;

  formBase.crearFormBase();
  formBase.validarValores();
  modalBody.append(...listaInputs);

  modalFooter.innerHTML = "";
  modalFooter.append(...listaBtns);
}

export function cerrarFormBase() {
  btnCerrar.click();
}

export function limpiarFormBase() {
  form.classList.remove("was-validated");
}
