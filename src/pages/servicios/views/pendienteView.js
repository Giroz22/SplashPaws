//Importaciones
import { traerPendientes } from "../models/pendientesModel.js";
import { mostrarDatosTbl } from "./serviciosView.js";

//Selectores
const btnPendientes = document.querySelector("#btnPendientes");
const titulo = document.querySelector(".titulo-container .titulo");
const divOpcServicio = document.querySelector(".opcs-servicio-container");
const ulPendientes = divOpcServicio.querySelector("ul");

//Eventos
document.addEventListener("DOMContentLoaded", () => {
  btnPendientes.click();
});

btnPendientes.addEventListener("click", (e) => {
  ulPendientes.innerHTML = "";
  titulo.textContent = "Pendientes";
  traerPendientes().then((datos) => mostrarDatosTbl(datos));
});
