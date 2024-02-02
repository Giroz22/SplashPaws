import * as main from "../../../../main.js";
import * as serviciosView from "./serviciosView.js";
import * as pendienteView from "./pendienteView.js";

export function modalGeneral(modalBody) {
  serviciosView.clean(modalBody);
  modalBody.innerHTML = `
    <form class="row g-3 needs-validation .form_modal" novalidate>
    <!--  Fila 1 -->
    <div class="col-md-4">
      <span for="nombre_propietario" class="form-label">Nombre del propietario</span>
      <input type="text" class="form-control" placeholder="Ingresa el nombre" id="nombre_propietario" required>
      <div class="invalid-feedback">
        Ingresa un nombre
      </div>
    </div>

    <div class="col-md-4">
      <span for="nombre_mascota" class="form-label">Nombre de la mascota</span>
      <input type="text" class="form-control" placeholder="Ingresa el nombre" id="nombre_mascota" required>
      <div class="invalid-feedback">
        Ingresa un nombre
      </div>

    </div>
    <div class="col-md-4">
      <span for="especie" class="form-label">Especie de la mascota</span>
      <select class="form-select" id="especie" required>
        <option selected disabled value="">Selecciona una especie</option>
        <option value="gato">Gato</option>
        <option value="perro">Perro</option>
      </select>
      <div class="invalid-feedback">
        Selecciona una especie
      </div>
    </div>
    <!--  Fila 2 -->


    <div class="col-md-4">
      <span for="telefono" class="form-label">Teléfono del propietario</span>
      <input type="tel" maxlength="15" minlength="10" class="form-control" id="telefono" placeholder="Ingresa un número de teléfono" required>
      <div class="invalid-feedback">
        Ingresa un teléfono
      </div>
    </div>
    <div class="col-md-4">
      <span for="fecha" class="form-label">Fecha</span>
      <input type="date" class="form-control" id="fecha" required>
      <div class="invalid-feedback">
        Selecciona una fecha
      </div>
    </div>

    <!--  Fila 3 -->

    <div class="col-md-4">
      <span for="hora" class="form-label">Hora</span>
      <select class="form-select" id="hora" required>
        <option selected disabled value="">Selecciona una hora</option>

      </select>
      <div class="invalid-feedback">
        Selecciona una hora
      </div>
    </div>

    <div class="col-md-4">
      <span for="servicio" class="form-label">Servicio</span>
      <select class="form-select" id="servicio" required>
        <option selected disabled value="">Selecciona un servicio</option>
        <option value="baño">Baño</option>
        <option value="guarderia">Guarderia</option>
      </select>
      <div class="invalid-feedback">
        Selecciona un servicio
      </div>
    </div>
    <div class="contenedor_buttom">
          <button class="btn btn_submit" type="submit">
            Agendar cita
          </button>
        </div>

  </form>
    `;

  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input");
  const selects = document.querySelectorAll("select");
  const selectContentHora = document.querySelector("#hora");
  const btnClose = document.querySelector(".btn-close");

  main.validarSelects(selects, selectContentHora, 8, 16);
  main.validarInputs(inputs);
  main.boostrapvalidator();

  console.log(selects);

  const btnEnviar = document.querySelector(".btn_submit");
  btnEnviar.addEventListener("click", (event) => {
    if (form.checkValidity()) {
      event.preventDefault();
      main.agregarCitasPendientes();
      main.limpiarInfo(inputs, selects);
      btnClose.click();

      window.location.reload()

    //   pendienteView.mostrarDtosPendientes()



    }



  });
}
