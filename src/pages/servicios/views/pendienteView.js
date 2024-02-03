// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as serviciosView from "./serviciosView.js";
import * as formBase from "./componentes/formBase.js";
import * as functionModal from "./functionModal.js";

// ===== Selectores =====
const btnPendientes = document.querySelector("#btnPendientes");

// =====Eventos =====
btnPendientes.addEventListener("click", async () => {
  baseModel.actualizarURL("serviciosPendientes");
  serviciosView.ulPendientes.innerHTML = "";
  serviciosView.titulo.textContent = "Pendientes";
  serviciosView.actualizarServicioActual("pendiente");

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

export function generarFormAgregar() {
  const btnAceptar = crearBotonAceptar();
  functionModal.crearBaseFormServicio("Formulario Pendiente", [], [btnAceptar]);
}

//=====Botones=====
//Boton Aceptar
function crearBotonAceptar() {
  const btnAceptar = document.createElement("button");

  btnAceptar.textContent = "Aceptar";

  btnAceptar.classList.add("btn", "btn-success");
  btnAceptar.setAttribute("type", "submit");

  btnAceptar.addEventListener("click", handlerBtnAgregar);

  return btnAceptar;
}

function handlerBtnAgregar(event) {
  const datos = formBase.obtenerDatos();
  if (!datos) {
    return;
  }
  event.preventDefault();
  baseModel.guardar(datos);
  mostrarDtosPendientes();
  functionModal.cerrarFormBase();
}

//Boton Borrar
function crearBotonBorrar() {
  const btnBorrar = document.createElement("button");

  btnBorrar.textContent = "Borrar";

  btnBorrar.classList.add("btn", "btn-danger");

  btnBorrar.addEventListener("click", handlerBtnBorrar);

  return btnBorrar;
}

function handlerBtnBorrar() {}
