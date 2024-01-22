/**
 *
 * @param {Valor minimo a generar} min
 * @param {Valor maximo a generar} max
 * @returns Número aleatorio entre el rango de parametros ingrezados
 */
function generarNumRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 *
 * @returns Número de identificacion unico en formato de texto
 */
function generarID() {
  return String(Date.now() + generarNumRandom(1, 100));
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
function generatorHeader(
  content,
  link1,
  link2,
  link3,
  url1,
  url2,
  url3,
  nameLogin,
  urlLogin
) {
  content.innerHTML = `
    <nav class="navbar">
    <a href="../main/html/main.html">
      <img src="../../media/imgs/logo_Splash_Paws.png" alt="" />
    </a>

    <label for="hamburguer"><i class="bi bi-list"></i></label>
    <input type="checkbox" id="hamburguer"/>

    <div class="navegation">
      <a href=${url1}>${link1}</a>
      <a href=${url2}>${link2}</a>
      <a href=${url3}>${link3}</a>
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
}

//Lo mismo que la funcion anterior solo que omiti el agendar cita y lo queme directamente
function generatorHeaderModal(
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
    <img src="../../../media/imgs/logo_Splash_Paws.png" alt="" />
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

    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="absolute"
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
            <div class="box_input">
              <span>Nombre del propietario</span>
              <input
                class="form-control"
                type="text"
                id="name_person"
                placeholder="Nombre del propietario"
                required
              />
            </div>

            <div class="box_input">
              <span>Nombre de la mascota</span>
              <input
                class="form-control"
                type="text"
                id="name_pet"
                placeholder="Nombre de la mascota"
                required
              />
            </div>

            <div class="box_input">
              <span>Tamaño de la mascota</span>
              <select id="pet_size">
                <option selected>Selecciona un tamaño</option>
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Madiano</option>
                <option value="grande">Grande</option>
              </select>
            </div>

            <div class="box_input">
              <span>Teléfono del propietario</span>
              <input
                class="form-control"
                type="tel"
                id="phonenumber"
                placeholder="Teléfono del propietario"
                required
              />
            </div>

            <div class="box_input">
              <span>Fecha</span>
              <input
                class="form-control"
                type="date"
                id="date"
                required
              />
            </div>

            <div class="box_input">
              <span>Hora</span>
              <input
                class="form-control"
                type="time"
                id="time"
                required
              />
            </div>

            <div class="box_input">
              <span>Servico</span>
              <select id="pet_service">
                <option selected>Selecciona un servicio</option>
                <option value="baño">Baño</option>
                <option value="guarderia" disabled>Guarderia</option>
              </select>
            </div>

            <div class="box_input">
              <button class="check">
                <i class="bi bi-check2"></i> Confirmar cita
              </button>
            </div>

            <div class="box_input">
              <button
                type="button"
                class="cancel"
              >
                <i class="bi bi-x-lg"></i>Cancelar cita
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a href=${url2}>${link2}</a>
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
}

function generatorFooter(content) {
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


