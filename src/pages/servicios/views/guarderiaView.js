// =====Importaciones =====
import * as baseModel from "../models/baseModel.js";
import * as serviciosView from "./serviciosView.js";
import * as main from "../../../../main.js";

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
    "Nombre de la Mascota",
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

//===>
export function generarFormGuarderia(modalBody, objectData) {
  console.log(objectData);
  // console.log((objectData.fecha.split("/").reverse().join("/")).replace("/", "-").replace("/", "-"));

  modalBody.innerHTML = `<form class="row g-3 needs-validation .form_modal" novalidate>
        <!--  Fila 1 -->
        <div class="col-md-4">
          <span for="nombre_propietario" class="form-label"
            >Nombre del propietario</span
          >
          <input
            type="text"
            class="form-control"
            placeholder="Ingresa el nombre"
            id="nombre_propietario"
            value = "${objectData.propietario.nombre}"
            required
          />
          <div class="invalid-feedback">Ingresa un nombre</div>
        </div>

        <div class="col-md-4">
          <span for="nombre_mascota" class="form-label"
            >Nombre de la mascota</span
          >
          <input
            type="text"
            class="form-control"
            placeholder="Ingresa el nombre"
            id="nombre_mascota"
            value = "${objectData.mascota.nombre}"
            required
          />
          <div class="invalid-feedback">Ingresa un nombre</div>
        </div>
        <div class="col-md-4">
          <span for="especie" class="form-label"
            >Especie de la mascota</span
          >
          <select class="form-select" id="especie" required>
            <option disabled value="">
              Selecciona una especie
            </option>
            <option value="gato">Gato</option>
            <option value="perro">Perro</option>
          </select>
          <div class="invalid-feedback">Selecciona una especie</div>
        </div>
        <!--  Fila 2 -->

        <div class="col-md-4">
          <span for="telefono" class="form-label"
            >Teléfono del propietario</span
          >
          <input
            type="tel"
            maxlength="15"
            minlength="10"
            class="form-control"
            id="telefono"
            value = "${objectData.propietario.telefono}"
            placeholder="Ingresa un número de teléfono"
            required
          />
          <div class="invalid-feedback">Ingresa un teléfono</div>
        </div>
        <div class="col-md-4">
          <span for="fecha" class="form-label">Fecha</span>
          <input
            type="date"
            class="form-control"
            id="fecha"
            value = "${objectData.fecha
              .split("/")
              .reverse()
              .join("/")
              .replace("/", "-")
              .replace("/", "-")}"
            required
          />
          <div class="invalid-feedback">Selecciona una fecha</div>
        </div>

        <!--  Fila 3 -->

        <div class="col-md-4">
          <span for="hora" class="form-label">Hora</span>
          <select class="form-select" id="hora" required>
            <option disabled value="">
              Selecciona una hora
            </option>
          </select>
          <div class="invalid-feedback">Selecciona una hora</div>
        </div>

        <div class="col-md-4">
          <span for="servicio" class="form-label">Servicio</span>
          <select class="form-select" id="servicio" required>
            <option disabled value="">
              Selecciona un servicio
            </option>
            <option value="baño">Baño</option>
            <option value="guarderia">Guarderia</option>
          </select>
          <div class="invalid-feedback">Selecciona un servicio</div>
        </div>

       

        <div class="contenedor_buttom">
          <button class="btn btn_submit" type="submit">
            Agendar cita
          </button>
          <button class="btn btn_cancel" type="button">
            Cancelar cita
          </button>
        </div>
      </form>`;

  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input");
  const selects = document.querySelectorAll("select");
  const selectContentHora = document.querySelector("#hora");
  const btnClose = document.querySelector(".btn-close");
  const btnEnviar = document.querySelector(".btn_submit");
  const btnCancelar = document.querySelector(".btn_cancel");

  main.validarSelects(selects, selectContentHora, 8, 16);

  const options = document.querySelectorAll("option");
  serviciosView.valorSelects(objectData, options);
  main.validarInputs(inputs);
  main.boostrapvalidator();

  console.log(selects);

  btnEnviar.addEventListener("click", (event) => {
    if (form.checkValidity()) {
      event.preventDefault();
      baseModel.actualizarURL("serviciosGuarderia");

      const nuevaCitaBannios = {
        id: objectData.id,
        mascota: {
          nombre: document.getElementById("nombre_mascota").value,
          especie: document.getElementById("especie").value,
        },
        propietario: {
          nombre: document.getElementById("nombre_propietario").value,
          telefono: document.getElementById("telefono").value,
        },

        fecha: document.getElementById("fecha").value,
        hora_llegada: document.getElementById("hora").value,
        hora_salida: "",
        servicio: document.getElementById("servicio").value,
        estado: "pendiente",
      };

      baseModel.guardar(nuevaCitaBannios);

      baseModel.actualizarURL("serviciosPendientes");
      baseModel.eliminar(objectData.id);
      btnClose.click();
      main.alertaCorrecto("Cita agendada correctamente");
      window.location.reload();
      banniosModel.mostrarDtosBannios();
    }
  });

  btnCancelar.addEventListener("click", (event) => {
    event.preventDefault();
    baseModel.eliminar(objectData.id);
    btnClose.click();
    window.location.reload();
  });
  //mostrarDtosGuarderia();
}
