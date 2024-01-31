//Traduccion
const URLBase = "https://api.mymemory.translated.net/";

/**
 *  Traduce una palabra ingresada en Ingles y la retorna en español
 * @param {Palabra que sera traducida} palabraIngles
 * @returns La palabra ingresada en Español
 */
async function traducirEspañol(palabraIngles) {
  const URL = `${URLBase}?langpair=en|es&q=${palabraIngles}`;
  const respuesta = await fetch(URL);
  const data = await respuesta.json();
  const traduccion = data.responseData.translatedText;
  return traduccion;
}

/**
 *  Traduce una palabra ingresada en español y la retorna en ingles
 * @param {Palabra que sera traducida} palabraEspañol
 * @returns La palabra ingresada en Ingles
 */
async function traducirIngles(palabraEspañol) {
  const URL = `${URLBase}?langpair=es|en&q=${palabraEspañol}`;
  const respuesta = await fetch(URL);
  const data = await respuesta.json();
  const traduccion = data.responseData.translatedText;
  return traduccion;
}

/** 
====== Funcion para generar el header ====== 
  
  @param {content} -> El contenedor en donde se va inyectar el navbar
  @param {link1,link2,link3} -> son el contenido de las "a"
  @param {url1,url2,url3} -> son el enlace al cual los van a direccionar
  @param {nameLogin} -> es el contenido del contenedor donde esta el login puede ser "Ingresar" o "Nombre del usuario"
  @param {urlLogin } -> es el enlace que va ser el login si no necesitan que redireccionen a algo le pasan "#"

  TODO LOS DATOS LO PASAN EN STRING EXCEPTO EL CONTENT QUE SERA LA VARIABLE EN DONDE ESTA EL CONTENEDOR
  
  generatorHeader -> no necesita boostrap
  generatorFooter -> no necesita boostrap
  generatorHeaderModal -> necesita boostrap


  Ejemplo:
    generatorHeaderModal(header,"Tienda","Contactos","#","#","Ingresar","#")
*/
export function generatorHeader(
  content,
  link1,
  url1,
  nameLogin,
  urlLogin
) {
  content.innerHTML = `
    <nav class="navbar navSolo">
    <a href="../main/html/main.html">
      <img src="../../../media/imgs/logo_Splash_Paws.png" alt="" />
    </a>

    <label for="hamburguer"><i class="bi bi-list"></i></label>
    <input type="checkbox" id="hamburguer"/>

    <div class="login loginSolo">
      <a href=${urlLogin}>${nameLogin}</a>
      <div class="line"></div>
      <button id="btn btn_leguage">
        <img
          src="https://cdn-icons-png.flaticon.com/128/197/197593.png"
          alt="spain_lenguage"
          id="spain_lenguage"
        />
        Español
      </button>
    </div>
  </nav>

    
    `;
}

//Lo mismo que la funcion anterior solo que omiti el agendar cita y lo queme directamente
export function generatorHeaderModal(
  content,
  link1,
  link2,
  url1,
  url2,
  nameLogin,
  urlLogin
) {
  content.innerHTML = `
  <nav class="navbar">
        <a href="../main/html/main.html">
          <img src="../../../media/imgs/logo_Splash_Paws.png" alt="Logo SplashPaws" />
        </a>
      
        <label for="hamburguer"><i class="bi bi-list"></i></label>
        <input type="checkbox" id="hamburguer" />
      
        <div class="navegation">
          <a href=${url1}>${link1}</a>
          <!-- Button trigger modal -->
          <a
            href="#"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Agendar cita
          </a>
      
          
    
          <a href=${url2}>${link2}</a>
          <div class="login login_responsive">
            <a href=${urlLogin}>${nameLogin}</a>
            <div class="line"></div>
            <button id="btn btn_leguage">
              <img
                src="https://cdn-icons-png.flaticon.com/128/197/197593.png"
                alt="spain_lenguage"
                id="spain_lenguage"
              />
              Español
            </button>
          </div>

        </div>
      
        <div class="login">
        <a href=${urlLogin}>${nameLogin}</a>
          <div class="line"></div>
          <button id="btn btn_leguage">
            <img
              src="https://cdn-icons-png.flaticon.com/128/197/197593.png"
              alt="spain_lenguage"
              id="spain_lenguage"
            />
            Español
          </button>
        </div>
      </nav>
  `;
  const navegation = document.querySelector(".navegation");
  generarModal(navegation);
}

export function validarInputs(inputs) {
  console.log("entro");
  inputs.forEach((input) => {
    switch (input.type) {
      case "date":
        // Validacion input tipo date
        let fechaActual = new Date();
        let dia = fechaActual.getDate() + 1;
        let mes = fechaActual.getMonth() + 1;
        let año = fechaActual.getFullYear();

        dia = dia < 10 ? "0" + dia.toString() : dia;
        mes = mes < 10 ? "0" + mes.toString() : mes;

        input.setAttribute("min", `${año}-${mes}-${dia}`);
        input.setAttribute("max", `${año + 1}-${mes}-${dia}`);

        break;
    }

    if (input.id == "hora") {
      console.log("hay una hora");
    }
  });
}

export function generarModal(content) {
  content.innerHTML += `
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Agendar cita
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body form_modal">
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
        
        <div class="contenedor_buttom ">
          <button class="btn btn_submit" type="submit">Agendar cita</button>
        </div>
      </form>

          
        </div>
      </div>
    </div>
  </div>
  `;

  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input");
  const selects = document.querySelectorAll("select");
  const selectContentHora = document.querySelector("#hora");
  const btnClose = document.querySelector(".btn-close");

  validarInputs(inputs);
  validarSelects(selects, selectContentHora, 8, 16);

  boostrapvalidator();

  const btnEnviar = document.querySelector(".btn_submit");
  btnEnviar.addEventListener("click", (event) => {
    if (form.checkValidity()) {
      event.preventDefault();
      agregarCitasPendientes();
      limpiarInfo(inputs, selects);

      btnClose.click();
    }
  });
}

export function validarSelects(selects, selectContent, horaInicio, horaFinal) {
  selects.forEach((select) => {
    if (select.id == "hora") {
      let contPm = 1;

      while (horaInicio <= horaFinal) {
        let option = document.createElement("option");
        console.log(horaInicio);

        if (horaInicio < 12) {
          option.value = `${horaInicio}:00 a.m`;
          option.textContent = option.value;

          console.log(option.value);
        } else if (horaInicio == 12) {
          option.value = `${horaInicio}:00 p.m`;
          option.textContent = option.value;

          console.log(option.value);
        } else {
          option.value = `${contPm}:00 p.m`;
          option.textContent = option.value;

          contPm++;
        }

        selectContent.appendChild(option);

        horaInicio++;
      }
    }
  });
}

async function agregarCitasPendientes() {
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

  try {
    const URL = "http://localhost:3000/serviciosPendientes";
    console.log("vamos bien");
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seviciosPendientes),
    });

    alertaCorrecto(
      "Tu cita se ha agregado exitosamente, en unos momentos nos contactaremos contigo"
    );
  } catch (error) {
    console.log("ERROR:", error);
    alertaError("Ha ocurrido un error");
  }

  console.log(seviciosPendientes);
}

export function limpiarInfo(inputs, slects) {
  inputs.forEach((input) => {
    input.value = "";
  });

  slects.forEach((slect) => {
    slect.value = "";
  });
}

export function alertaCorrecto(msg) {
  Swal.fire({
    // position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: true,
  });
}

export function alertaError(msg) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
    footer: "Intentalo nuevamente",
    showConfirmButton: true,
  });
}

export function boostrapvalidator() {
  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
}

export function generatorFooter(content) {
  content.innerHTML = `
  <a href="#">
  <img
    src="../../../media/imgs/logo_Splash_Paws_2_blanco.png"
    alt="logo2"
  />
</a>
<div class="footer_content">
  <!-- About us -->
  <div class="about">
    <h3>Sobre nosotros</h3>
    <p>
      Bienvenido a Splash Paws, el lugar donde cuidamos y consentimos a
      tus mascotas. Somos tu destino para productos de calidad y servicios
      especializados. Desde juguetes hasta servicios de baño y guardería,
      nos dedicamos a hacer que tus amigos peludos se sientan amados y
      mimados.
    </p>
  </div>

  <!-- Social Media -->
  <div class="social">
    <div class="social_media">
      <h3>Redes sociales</h3>
      <div class="social_content">
        <i class="bi bi-facebook"></i>
        <a
          href="https://www.facebook.com/profile.php?id=100092420949391"
          target="_blank"
          >Facebook</a
        >
      </div>

      <div class="social_content">
        <i class="bi bi-instagram"></i>
        <a href="https://www.instagram.com/riwi.io/" target="_blank"
          >Instagram</a
        >
      </div>
    </div>

    <!-- Contacts -->
    <div class="social_media">
      <h3>Contactos</h3>
      <div class="social_content">
        <i class="bi bi-whatsapp"></i>
        <a href=" https://wa.me/3005106787" target="_blank"
          >+57 300 5106787</a
        >
      </div>

      <div class="social_content">
        <i class="bi bi-facebook"></i>
        <a href="#">splashPaws@gmail.com</a>
      </div>
    </div>
  </div>

  <!-- Map -->
  <div class="map_content">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3378581743473!2d-75.58619518993594!3d6.219100993742911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44293f0e114eef%3A0x99610cdd44c7c081!2sRiwi%20-%20Be%20a%20Coder!5e0!3m2!1ses-419!2sco!4v1705375004224!5m2!1ses-419!2sco"
      width="600"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>
  `;
}
