// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as serviciosView from "./serviciosView.js";
import * as main from "../../../../main.js";
import * as formBase from "./componentes/formBase.js";
import * as functionModal from "./functionModal.js";
import * as guarderiaController from "../controllers/guarderiaController.js";

//===== Eventos =====
btnGuarderia.addEventListener("click", () => {
  baseModel.actualizarURL("serviciosGuarderia");
  serviciosView.actualizarServicioActual("guarderia");

  mostrarDtosGuarderia();
  serviciosView.titulo.textContent = "Guarderia";

  const listaOpc = [
    {
      descripcion: "Todos",
      handler: mostrarDtosGuarderia,
    },
    {
      descripcion: "Pendiente",
      handler: () => {
        serviciosView.mostrarPorEstado("pendiente", handleBtnsDetalle);
      },
    },
    {
      descripcion: "En Guarderia",
      handler: () => {
        serviciosView.mostrarPorEstado("guarderia", handleBtnsDetalle);
      },
    },
    {
      descripcion: "Salieron",
      handler: () => {
        serviciosView.mostrarPorEstado("salio", handleBtnsDetalle);
      },
    },
    {
      descripcion: "Cancelados",
      handler: () => {
        serviciosView.mostrarPorEstado("cancelado", handleBtnsDetalle);
      },
    },
  ];
  serviciosView.llenarUlServicio(listaOpc);
});

//===== Funciones =====
export function generarInputsHtml() {
  return `
  `;
}

async function mostrarDtosGuarderia() {
  serviciosView.mostrarDatosThead([
    "ID",
    "Nombre de la Mascota",
    "Especie",
    "Propietario",
    "Telefono",
    "Fecha",
    "Hora llegada",
    "Hora salida",
    "Estado",
    "Servicio",
    "Detalle",
  ]);
  const datos = await baseModel.obtenerDatos();
  serviciosView.mostrarDatosTbl(datos, handleBtnsDetalle);
}

function actualizarTbl() {
  setTimeout(() => {
    mostrarDtosGuarderia();
  }, 1000);
}

function obtenerDatos() {
  if (!formBase.form.checkValidity()) {
    return;
  }

  const objDatos = formBase.obtenerDatos();
  objDatos["hora_salida"] = "";
  objDatos["estado"] = "pendiente";
  objDatos["servicio"] = "guarderia";

  return objDatos;
}

function asignarDatos(objDatos) {}

export function generarFormAgregar() {
  const btnCrear = generarBotonCrear();
  const btnCerrar = functionModal.generarBtnCerrar();

  functionModal.crearBaseFormServicio(
    `Formulario Guarderia`,
    generarInputsHtml(),
    [btnCrear, btnCerrar]
  );
}

async function handleBtnsDetalle(event) {
  const id = event.target.dataset.id;
  const objDatos = await baseModel.obtenerID(id);
  const listaBtns = [];
  const btnIngresar = generarBtnIngresar(id);
  const btnCancelarCita = generarBtnCancelar(id);
  const btnBorrar = generarBtnBorrar(id);
  const btnEntregar = generarBtnEntregar(id);
  const btnCerrar = functionModal.generarBtnCerrar();

  switch (objDatos["estado"]) {
    case "pendiente":
      listaBtns.push(btnIngresar, btnCancelarCita, btnCerrar);
      break;

    case "guarderia":
      listaBtns.push(btnEntregar, btnCerrar);
      break;

    case "entregado":
    case "cancelado":
      listaBtns.push(btnBorrar, btnCerrar);
      break;

    default:
      console.error("Error al asignar los botones");
      return;
  }

  functionModal.crearBaseFormServicio(
    `Detalles de la mascota ${objDatos.mascota.nombre}`,
    generarInputsHtml(),
    listaBtns
  );

  formBase.AsignarDatos(objDatos);
  asignarDatos(objDatos);
}

//=====Botones=====
//-----Boton Crear-----
function generarBotonCrear() {
  const btnCrear = functionModal.crearBotonBase(
    "Crear",
    ["btn-success"],
    handlerBtnCrear
  );
  btnCrear.setAttribute("type", "submit");
  return btnCrear;
}

function handlerBtnCrear(event) {
  const datos = obtenerDatos();
  if (!datos) {
    return;
  }
  event.preventDefault();
  baseModel.guardar(datos);
  functionModal.cerrarFormBase();
  actualizarTbl();
}

//---- Boton iniciar -----
function generarBtnIngresar(id) {
  const btnIngresar = functionModal.crearBotonBase(
    "Ingresar",
    ["btn-primary"],
    handleBtnIngresar
  );
  btnIngresar.dataset.id = id;

  return btnIngresar;
}

function handleBtnIngresar(event) {
  const id = event.target.dataset.id;
  const objDtos = { id, ...obtenerDatos() };

  if (!objDtos) {
    return;
  }
  event.preventDefault();

  guarderiaController.ingresarGuarderia(objDtos);

  functionModal.cerrarFormBase();
  actualizarTbl();
}

//----- Boton Finalizar -----
function generarBtnEntregar(id) {
  const btnEntregar = functionModal.crearBotonBase(
    "Entregar",
    ["btn-success"],
    handleBtnEntregar
  );
  btnEntregar.dataset.id = id;

  return btnEntregar;
}

function handleBtnEntregar(event) {
  const id = event.target.dataset.id;
  const objDtos = { id, ...obtenerDatos() };

  if (!objDtos) {
    return;
  }
  event.preventDefault();

  guarderiaController.entregarGuarderia(objDtos);

  functionModal.cerrarFormBase();
  actualizarTbl();
}

//------ Boton Cancelar -----
function generarBtnCancelar(id) {
  const btnCancelar = functionModal.crearBotonBase(
    "Cancelar",
    ["btn-danger"],
    handleBtnCancelar
  );
  btnCancelar.dataset.id = id;

  return btnCancelar;
}

function handleBtnCancelar(event) {
  const id = event.target.dataset.id;
  const objDtos = { id, ...obtenerDatos() };

  if (!objDtos) {
    return;
  }
  event.preventDefault();

  guarderiaController.cancelarGuarderia(objDtos);
  functionModal.cerrarFormBase();
  actualizarTbl();
}

//------ Boton Borrar  ------
function generarBtnBorrar(id) {
  const btnBorrar = functionModal.crearBotonBase(
    "Borrar",
    ["btn-danger"],
    handleBtnBorrar
  );
  btnBorrar.dataset.id = id;

  return btnBorrar;
}

function handleBtnBorrar(event) {
  const id = event.target.dataset.id;

  if (!id) {
    return;
  }
  event.preventDefault();

  baseModel.eliminar(id);
  functionModal.cerrarFormBase();
  actualizarTbl();
}
