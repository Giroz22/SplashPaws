import * as main from "../../../../../main.js";

//Contenedor modal
const modal = document.getElementById("servicioModal");
const form = document.getElementById("formServicio");

export function crearFormBase() {
  const modalBody = modal.querySelector(".modal-body");
  modalBody.innerHTML = generarForm();
  validarValores();
}

function generarForm() {
  return `
        <div class="">
        <span for="nombre_propietario" class="form-label"
            >Nombre del propietario</span
        >
        <input
            type="text"
            class="form-control"
            placeholder="Ingresa el nombre"
            id="nombre_propietario"
            required
        />
        <div class="invalid-feedback">Ingresa un nombre</div>
        </div>

        <div class="">
        <span for="nombre_mascota" class="form-label"
            >Nombre de la mascota</span
        >
        <input
            type="text"
            class="form-control"
            placeholder="Ingresa el nombre"
            id="nombre_mascota"
            required
        />
        <div class="invalid-feedback">Ingresa un nombre</div>
        </div>
        <div class="">
        <span for="especie" class="form-label"
            >Especie de la mascota</span
        >
        <select class="form-select" id="especie" required>
            <option selected disabled value="">
            Selecciona una especie
            </option>
            <option value="gato">Gato</option>
            <option value="perro">Perro</option>
        </select>
        <div class="invalid-feedback">Selecciona una especie</div>
        </div>

        <div class="">
        <span for="telefono" class="form-label"
            >Teléfono del propietario</span
        >
        <input
            type="tel"
            maxlength="15"
            minlength="10"
            class="form-control"
            id="telefono"
            placeholder="Ingresa un número de teléfono"
            required
        />
        <div class="invalid-feedback">Ingresa un teléfono</div>
        </div>
        <div class="">
        <span for="fecha" class="form-label">Fecha</span>
        <input
            type="date"
            class="form-control"
            id="fecha"
            required
        />
        <div class="invalid-feedback">Selecciona una fecha</div>
        </div>

        <div class="">
        <span for="hora" class="form-label">Hora</span>
        <select class="form-select" id="hora" required>
            <option selected disabled value="">
            Selecciona una hora
            </option>
        </select>
        <div class="invalid-feedback">Selecciona una hora</div>
        </div>

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

export function validarValores() {
  const inputs = modal.querySelectorAll("input");
  const selects = document.querySelectorAll("select");
  const selectContentHora = document.querySelector("#hora");

  main.validarSelects(selects, selectContentHora, 8, 16);
  main.validarInputs(inputs);
  main.boostrapvalidator();
}

export function obtenerDatos() {
  if (!form.checkValidity()) {
    return;
  }

  const seviciosPendientes = {
    mascota: {
      nombre: document.querySelector("#nombre_mascota").value,
      especie: document.querySelector("#especie").value,
    },

    propietario: {
      nombre: document.querySelector("#nombre_propietario").value,
      telefono: document.querySelector("#telefono").value,
    },

    fecha: document.querySelector("#fecha").value,
    hora_llegada: document.querySelector("#hora").value,
    servicio: document.querySelector("#servicio").value,
  };

  return seviciosPendientes;
}
