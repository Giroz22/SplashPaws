// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
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
  serviciosView.mostrarDatosThead([
    "ID",
    "Nombre de la Mascota",
    "Especie",
    "Propietario",
    "Telefono",
    "Fecha",
    "Hora llegada",
    "Servicio",
    "Detalle",
  ]);
  const datos = await baseModel.obtenerDatos();
  serviciosView.mostrarDatosTbl(datos);
}
