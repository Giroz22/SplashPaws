// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as pendientesModel from "../models/pendientesModel.js";
import * as serviciosView from "./serviciosView.js";

// ===== Selectores =====
const btnPendientes = document.querySelector("#btnPendientes");

// =====Eventos =====
btnPendientes.addEventListener("click", async () => {
  baseModel.actualizarURL("serviciosPendientes");
  serviciosView.ulPendientes.innerHTML = "";
  serviciosView.titulo.textContent = "Pendientes";
  mostrarDtosPendientes();
});

//===== Funciones =====
async function mostrarDtosPendientes() {
  const datos = await baseModel.obtenerDatos();
  serviciosView.mostrarDatosTbl(datos, handleBtnsDetalle);
}

async function handleBtnsDetalle(evento) {
  const id = evento.target.dataset.id;
  const obj = await baseModel.obtenerID(id);
  console.log(obj);
}
