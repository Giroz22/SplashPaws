// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as serviciosView from "./serviciosView.js";
import * as formBase from "./componentes/formBase.js";
import * as functionModal from "./functionModal.js";
import * as banniosView from "./banniosView.js";

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
    "Detalle",
    "Servicio",
  ]);
  const datos = await baseModel.obtenerDatos();
  serviciosView.mostrarDatosTbl(datos, handleBtnsDetalle);
}

function actualizarDtosPendientes() {
  setTimeout(() => {
    mostrarDtosPendientes();
  }, 1000);
}

export function generarFormAgregar() {
  const btnCrear = generarBtnCrear();
  functionModal.crearBaseFormServicio(
    "Crear Cita Pendiente",
    generarInputsHtml(),
    [btnCrear]
  );
}

function asignarDatos(obj) {
  document.querySelector("#servicio").value = obj["servicio"];
}

//=====Botones=====
//-----Boton detalle-----
async function handleBtnsDetalle(event) {
  const idPendiente = event.target.dataset.id;
  const objPendiente = await baseModel.obtenerID(idPendiente);
  const btnConfirmar = generarBtnConfirmar(objPendiente.id);
  const btnCancelar = crearBtnCancelar(objPendiente.id);

  functionModal.crearBaseFormServicio(
    `${objPendiente.mascota.nombre} esta esperando a corfirmar su cita!!`,
    generarInputsHtml() + banniosView.generarInputsHtml(),
    [btnConfirmar, btnCancelar]
  );

  formBase.AsignarDatos(objPendiente);
  asignarDatos(objPendiente);
}

//-----Boton Confirmar Cita-----
function generarBtnConfirmar(id) {
  const btnConfirmar = functionModal.crearBotonBase(
    "Confirmar",
    ["btn-success"],
    handlerBtnConfirmar
  );

  btnConfirmar.setAttribute("data-id", id);
  btnConfirmar.setAttribute("type", "submit");

  return btnConfirmar;
}

function handlerBtnConfirmar(event) {
  const objDatos = obtenerDatosPendiente();
  const idPendiente = event.target.dataset.id;

  if (!objDatos) {
    return;
  }
  event.preventDefault();

  switch (objDatos.servicio) {
    case "baño":
      baseModel.actualizarURL("serviciosBannios");
      break;

    case "guarderia":
      baseModel.actualizarURL("serviciosGuarderia");
      break;
    default:
      console.log(`Error el servicio ${objDatos.servicio} no existe`);
      return;
  }

  //Agregamos la informacio al nuevo servicio
  baseModel.guardar(objDatos);

  //Eliminamos el Servicio pendiente
  baseModel.actualizarURL("serviciosPendientes");
  baseModel.eliminar(idPendiente);

  functionModal.cerrarFormBase();

  actualizarDtosPendientes();
}

//-----Boton Borrar-----
function crearBtnCancelar(id) {
  const btnCancelar = functionModal.crearBotonBase(
    "Cancelar",
    ["btn-danger"],
    handlerBtnCancelar
  );

  btnCancelar.setAttribute("data-id", id);

  return btnCancelar;
}

function handlerBtnCancelar(event) {
  event.preventDefault();

  const idPendiente = event.target.dataset.id;
  baseModel.eliminar(idPendiente);

  actualizarDtosPendientes();
  functionModal.cerrarFormBase();
}

//-----Boton Crear-----
function generarBtnCrear() {
  const btnCrear = functionModal.crearBotonBase(
    "Crear",
    ["btn-success"],
    handlerBtnCrear
  );
  btnCrear.setAttribute("type", "submit");
  return btnCrear;
}

function handlerBtnCrear(event) {
  const datos = formBase.obtenerDatos();
  if (!datos) {
    return;
  }
  event.preventDefault();

  datos["servicio"] = document.querySelector("#servicio").value;
  baseModel.guardar(datos);
  actualizarDtosPendientes();
  functionModal.cerrarFormBase();
}

//=====inputs=====
function generarInputsHtml() {
  return `
    <div class="">
    <span for="servicio" class="form-label">Servicio</span>
    <select class="form-select" id="servicio" required>
        <option selected disabled value="">
        Selecciona un servicio
        </option>
        <option value="baño">Baño</option>
        <option value="guarderia">Guarderia</option>
    </select>
    <div class="invalid-feedback">Selecciona un servicio</div>
    </div>
  `;
}

// ====Obtener Datos====
function obtenerDatosPendiente() {
  if (!formBase.form.checkValidity()) {
    return;
  }

  const objDatos = formBase.obtenerDatos();
  objDatos["mascota"]["tamanio"] = document.querySelector("#tamannio").value;
  objDatos["mascota"]["pelaje"] = document.querySelector("#pelaje").value;
  objDatos["hora_salida"] = "";
  objDatos["estado"] = "pendiente";
  objDatos["servicio"] = document.querySelector("#servicio").value;

  return objDatos;
}
