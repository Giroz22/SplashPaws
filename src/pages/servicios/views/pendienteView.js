// =====Importaciones =====
import { traerTodosServiciosPendientes } from "../models/pendientesModel.js";
import { tabla, mostrarDatosTbl } from "./serviciosView.js";

// ===== Selectores =====
const btnPendientes = document.querySelector("#btnPendientes");
const titulo = document.querySelector(".titulo-container .titulo");
const divOpcServicio = document.querySelector(".opcs-servicio-container");
const ulPendientes = divOpcServicio.querySelector("ul");

// =====Eventos =====
document.addEventListener("DOMContentLoaded", () => {
  btnPendientes.click();
});

btnPendientes.addEventListener("click", () => {
  ulPendientes.innerHTML = "";
  titulo.textContent = "Pendientes";
  traerTodosServiciosPendientes().then((datos) =>
    mostrarDatosTbl(datos, handleBtnsDetalle)
  );
});

//===== Funciones =====
function handleBtnsDetalle(evento) {
  console.log(evento.target);
}
