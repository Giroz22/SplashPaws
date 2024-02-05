//Importaciones
import * as formBase from "./componentes/formBase.js";

//=====Modal=====
//Contenedor modal
const modal = document.getElementById("servicioModal");
const form = document.getElementById("formServicio");
const btnCerrar = modal.querySelector(".btn-close");

// Eventos
btnCerrar.addEventListener("click", () => {
  setTimeout(() => {
    limpiarModal();
  }, 800);
});

export function crearBaseFormServicio(textoTitulo, htmlInputs, listaBtns) {
  const titulo = modal.querySelector("#servicioModalLabel");
  const modalBody = modal.querySelector(".modal-body");
  const modalFooter = modal.querySelector(".modal-footer");

  titulo.textContent = textoTitulo;

  formBase.crearFormBase();
  formBase.validarValores();
  modalBody.innerHTML += htmlInputs;

  modalFooter.innerHTML = "";
  modalFooter.append(...listaBtns);
}

export function cerrarFormBase() {
  btnCerrar.click();
}

export function limpiarModal() {
  form.classList.remove("was-validated");
  modal.querySelector("#servicioModalLabel").innerHTML = "";
  modal.querySelector(".modal-body").innerHTML = "";
  modal.querySelector(".modal-footer").innerHTML = "";
}

/**
 * Permite Crear un boton base para utilizar en el modal
 * @param {tecto que tendra el boton} textoBtn
 * @param {Estilos en boostrap que tendra el boton} boostrapEstilo
 * @param {Funcion que ejecutara el boton al darle click} handlerBtn
 * @returns Un boton con base para usar en el modal
 */
export function crearBotonBase(textoBtn, boostrapEstilo, handlerBtn) {
  const btnBase = document.createElement("button");

  btnBase.textContent = textoBtn;

  btnBase.classList.add("btn", ...boostrapEstilo);

  btnBase.addEventListener("click", handlerBtn);

  return btnBase;
}

//------ Boton cerrar ------
export function generarBtnCerrar() {
  const btnCerrar = crearBotonBase(
    "Cerrar",
    ["btn-secondary"],
    handleBtnCerrar
  );

  return btnCerrar;
}

function handleBtnCerrar(event) {
  event.preventDefault();
  cerrarFormBase();
}
