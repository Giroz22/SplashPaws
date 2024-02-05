// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as banniosModel from "../models/banniosModel.js";
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
        serviciosView.mostrarPorEstado("pendiente");
      },
    },
    {
      descripcion: "Proceso",
      handler: () => {
        serviciosView.mostrarPorEstado("proceso");
      },
    },
    {
      descripcion: "Finalizado",
      handler: () => {
        serviciosView.mostrarPorEstado("finalizado");
      },
    },
    {
      descripcion: "Cancelado",
      handler: () => {
        serviciosView.mostrarPorEstado("cancelado");
      },
    },
  ];
  serviciosView.llenarUlServicio(listaOpc);
});

//===== Funciones =====
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

export function generarFormAgregar() {
  const btnCrear = generarBotonCrear();

  functionModal.crearBaseFormServicio(`Formulario Baños`, generarInputsHtml(), [
    btnCrear,
  ]);
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

async function handleBtnsDetalle(event) {
  const id = event.target.dataset.id;
  const objDatos = await baseModel.obtenerID(id);

  functionModal.crearBaseFormServicio(
    `Detalles de la mascota ${objDatos.mascota.nombre}`,
    generarInputsHtml(),
    []
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
function generarBtnIniciar() {}

function handleBtnIniciar() {}

//----- Boton Finalizar -----
function generarBtnFinalizar() {}

function handleBtnFinalizar() {}

//------ Boton Cancelar -----
function generarBtnCancelar() {}

function handleBtnCancelar() {}
