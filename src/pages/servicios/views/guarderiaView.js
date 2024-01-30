// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as serviciosView from "./serviciosView.js";

//===== Selectores =====

const btnPendientes = document.querySelector("#btnPendientes");

//===== Eventos =====
btnGuarderia.addEventListener("click", () => {
  baseModel.actualizarURL("serviciosGuarderia");
  mostrarDtosGuarderia();
  serviciosView.titulo.textContent = "Guarderia";

  const listaOpc = [
    {
      descripcion: "Todos",
      handler: mostrarDtosGuarderia,
    },
    {
      descripcion: "En Guarderia",
      handler: () => {
        serviciosView.mostrarPorEstado("guarderia");
      },
    },
    {
      descripcion: "Finalizados",
      handler: () => {
        serviciosView.mostrarPorEstado("finalizado");
      },
    },
    {
      descripcion: "Cancelados",
      handler: () => {
        serviciosView.mostrarPorEstado("cancelado");
      },
    },
  ];
  serviciosView.llenarUlServicio(listaOpc);
});

//===== Funciones =====
async function mostrarDtosGuarderia() {
  serviciosView.mostrarDatosThead([
    "ID",
    "Nombre Mascota",
    "Especie",
    "Tamaño",
    "Pelaje",
    "Propietario",
    "Telefono",
    "Fecha",
    "Hora llegada",
    "Hora salida",
    "Servicio",
    "Estado",
    "Detalle",
  ]);
  const datos = await baseModel.obtenerDatos();
  serviciosView.mostrarDatosTbody(datos);
}
