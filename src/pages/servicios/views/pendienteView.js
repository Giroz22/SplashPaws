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
  serviciosView.mostrarDatosTbl(datos, handleBtnsDetalle);
}

export function generarFormAgregar() {
  const btnCrear = crearBotonCrear();
  functionModal.crearBaseFormServicio("Crear Cita Pendiente", [], [btnCrear]);
}

//=====Botones=====
//-----Boton detalle-----
async function handleBtnsDetalle(event) {
  const idPendiente = event.target.dataset.id;
  const objPendiente = await baseModel.obtenerID(idPendiente);
  const btnConfirmar = crearBtnConfirmar(objPendiente.id);
  const btnCancelar = crearBtnCancelar(objPendiente.id);

  functionModal.crearBaseFormServicio(
    `${objPendiente.mascota.nombre} esta esperando a corfirmar su cita!!`,
    crearInputs(),
    [btnConfirmar, btnCancelar]
  );

  formBase.AsignarDatos(objPendiente);
}

//-----Boton Confirmar Cita-----
function crearBtnConfirmar(id) {
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

  mostrarDtosPendientes();
  functionModal.cerrarFormBase();
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
  functionModal.cerrarFormBase();
}

//-----Boton Crear-----
function crearBotonCrear() {
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
  baseModel.guardar(datos);
  mostrarDtosPendientes();
  functionModal.cerrarFormBase();
}

//=====inputs=====
function crearInputs() {
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

  return objDatos;
}
