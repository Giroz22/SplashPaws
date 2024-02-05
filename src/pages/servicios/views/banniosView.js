// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as banniosModel from "../models/banniosModel.js";
import * as banniosController from "../controllers/banniosController.js";
import * as serviciosView from "./serviciosView.js";
import * as main from "../../../../main.js";
import * as functionModal from "./functionModal.js";
import * as formBase from "./componentes/formBase.js";

//===== Eventos =====
btnBannios.addEventListener("click", () => {
  baseModel.actualizarURL("serviciosBannios");
  serviciosView.actualizarServicioActual("bannios");

  mostrarDtosBannios();

  serviciosView.titulo.textContent = "Baños";

  const listaOpc = [
    { descripcion: "Todo", handler: mostrarDtosBannios },
    {
      descripcion: "Pendiente",
      handler: () => {
        serviciosView.mostrarPorEstado("pendiente", handleBtnsDetalle);
      },
    },
    {
      descripcion: "Proceso",
      handler: () => {
        serviciosView.mostrarPorEstado("proceso", handleBtnsDetalle);
      },
    },
    {
      descripcion: "Finalizado",
      handler: () => {
        serviciosView.mostrarPorEstado("finalizado", handleBtnsDetalle);
      },
    },
    {
      descripcion: "Cancelado",
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

      <div class="">
      <span for="tamannio" class="form-label">Tamaño</span>
      <select class="form-select" id="tamannio" required>
          <option selected disabled value="">
            Selecciona un tamaño
          </option>
          <option value="gigante">Gigante</option>
          <option value="grande">Grande</option>
          <option value="mediano">Mediano</option>
          <option value="pequeño">Pequeño</option>
        </select>
        <div class="invalid-feedback">Selecciona un tamaño</div>
    </div>

    <div class="">
      <span for="pelaje" class="form-label">Pelaje</span>
      <input
        type="text"
        class="form-control"
        id="pelaje"
        placeholder= "Ingresa el pelaje"
        required
      />
      <div class="invalid-feedback">Selecciona una pelaje</div>
    </div>
  `;
}

async function mostrarDtosBannios() {
  serviciosView.mostrarDatosThead([
    "ID",
    "Nombre de la Mascota",
    "Especie",
    "Tamaño",
    "Pelaje",
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
    mostrarDtosBannios();
  }, 1000);
}

function obtenerDatos() {
  if (!formBase.form.checkValidity()) {
    return;
  }

  const objDatos = formBase.obtenerDatos();
  objDatos["mascota"]["tamanio"] = document.querySelector("#tamannio").value;
  objDatos["mascota"]["pelaje"] = document.querySelector("#pelaje").value;
  objDatos["hora_salida"] = "";
  objDatos["estado"] = "pendiente";
  objDatos["servicio"] = "baño";

  return objDatos;
}

function asignarDatos(objDatos) {
  document.querySelector("#tamannio").value = objDatos["mascota"]["tamanio"];
  document.querySelector("#pelaje").value = objDatos["mascota"]["pelaje"];
}

export function generarFormAgregar() {
  const btnCrear = generarBotonCrear();

  functionModal.crearBaseFormServicio(`Formulario Baños`, generarInputsHtml(), [
    btnCrear,
  ]);
}

async function handleBtnsDetalle(event) {
  const id = event.target.dataset.id;
  const objDatos = await baseModel.obtenerID(id);
  const listaBtns = [];
  const btnIniciar = generarBtnIniciar(id);
  const btnCancelarCita = generarBtnCancelar(id);
  const btnFinalizar = generarBtnFinalizar(id);
  const btnBorrar = generarBtnBorrar(id);
  const btnCerrar = functionModal.generarBtnCerrar();

  switch (objDatos["estado"]) {
    case "pendiente":
      listaBtns.push(btnIniciar, btnCancelarCita, btnCerrar);
      break;

    case "proceso":
      listaBtns.push(btnFinalizar, btnCancelarCita, btnCerrar);
      break;

    case "finalizado":
    case "cancelado":
      listaBtns.push(btnBorrar, btnCerrar, btnCerrar);
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
function generarBtnIniciar(id) {
  const btnIniciar = functionModal.crearBotonBase(
    "Iniciar",
    ["btn-primary"],
    handleBtnIniciar
  );
  btnIniciar.dataset.id = id;

  return btnIniciar;
}

function handleBtnIniciar(event) {
  const id = event.target.dataset.id;
  const objDtos = { id, ...obtenerDatos() };

  if (!objDtos) {
    return;
  }
  event.preventDefault();

  banniosController.iniciarBannio(objDtos);

  functionModal.cerrarFormBase();
  actualizarTbl();
}

//----- Boton Finalizar -----
function generarBtnFinalizar(id) {
  const btnFinalizar = functionModal.crearBotonBase(
    "Finalizar",
    ["btn-success"],
    handleBtnFinalizar
  );
  btnFinalizar.dataset.id = id;

  return btnFinalizar;
}

function handleBtnFinalizar(event) {
  const id = event.target.dataset.id;
  const objDtos = { id, ...obtenerDatos() };

  if (!objDtos) {
    return;
  }
  event.preventDefault();

  banniosController.finalizarBannio(objDtos);

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

  banniosController.cancelarBannio(objDtos);
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
