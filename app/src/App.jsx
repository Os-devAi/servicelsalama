import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";
import "./Form.css";
import "./iFrame.css";
import phoneMaintenance from "./assets/phone_maintenance_1.png";
import apple from "./assets/apple.png";
import samsung from "./assets/samsung.png";
import motorola from "./assets/motorola.png";
import xiaomi from "./assets/xiaomi.png";
import Products from "./components/Products";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";

function TypewriterEffect({ text, speed = 100 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);
  return <h1>{displayedText}</h1>;
}

function App() {
  const [producto, setProduct] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "productos_servicel")
        );
        const productosArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Productos obtenidos:", productosArray);
        setProduct(productosArray);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      {/* Encabezado con efecto de máquina de escribir */}
      <div className="header">
        <TypewriterEffect text="Servicel Salamá" speed={150} />
        <div className="items-container">
          <a href="#secc-productos">Productos</a>
          <a href="#servicios">Servicios</a>
          <a href="">Galería</a>
          <a href="">Acerca de</a>
        </div>
      </div>

      {/* Sección principal con animaciones */}
      <div className="home-main">
        {/* Animación del texto */}
        <motion.div
          className="home-main-text"
          initial={{ opacity: 0, y: 50 }} // Comienza invisible y desplazado hacia abajo
          animate={{ opacity: 1, y: 0 }} // Se vuelve visible y sube suavemente
          transition={{ duration: 1 }} // Duración de la animación
        >
          <h1 className="title-main">
            Te ayudamos a reparar <br />
            tu smartphone y tablet.
          </h1>
          <p>
            Expertos en Reparación de Celulares por Más de 20 Años <br />
            Pantallas, baterías, software y más. ¡Cotiza tu reparación hoy y
            recupera tu celular como nuevo!
          </p>

          {/* Botón de contacto con animación */}
          <div className="btton-container">
            <a href="#contacto">
              <button
                class="contactButton"
                whileHover={{ scale: 1.1 }} // Efecto hover (crece)
                whileTap={{ scale: 0.9 }}
              >
                Contactanos
                <div class="iconButton">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </a>
          </div>
        </motion.div>

        {/* Animación de la imagen */}
        <motion.div
          className="home-main-img"
          initial={{ opacity: 0, x: 100 }} // Comienza invisible y desplazado a la derecha
          animate={{ opacity: 1, x: 0 }} // Se vuelve visible y se mueve suavemente
          transition={{ duration: 1, delay: 0.5 }} // Retraso en la animación
        >
          <motion.img
            className="image-main"
            src={phoneMaintenance}
            alt="phone_maintenance"
            initial={{ scale: 0.8 }} // Aparece más pequeño
            animate={{ scale: 1 }} // Luego se expande a tamaño normal
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </div>

      {/* marcas */}
      <div className="marcas-container">
        <img className="image-marca" src={samsung} alt="logo samsung" />
        <img className="image-marca" src={apple} alt="logo apple" />
        <img className="image-marca" src={motorola} alt="logo motorola" />
        <img className="image-marca" src={xiaomi} alt="logo xiaomi" />
      </div>

      {/* Sección de productos */}
      <section id="secc-productos">
        <h2 style={{ color: "#FFFFFF" }}>Algunos Productos</h2>
        <div className="products-container">
          {producto.length > 0 ? (
            producto.map((item) => <Products key={item.id} producto={item} />)
          ) : (
            <p>Cargando productos...</p>
          )}
        </div>
      </section>

      <hr />

      {/* seccion servicios */}
      <section id="servicios">
        <h2 color="#FFFfff">Nuestros Servicios</h2>
        <p>
          ¿Tu celular tiene una pantalla rota, batería que no dura o problemas
          de funcionamiento? ¡No te preocupes! En <b>Servicel Salamá</b> somos
          expertos en reparaciones y liberaciones de celulares de todas las
          marcas y modelos. Ofrecemos un servicio rápido, eficiente y con
          garantía, para que puedas seguir disfrutando de tu dispositivo como
          nuevo.
        </p>
        <div className="servicios-container">
          <div className="image-servicios">
            <img
              src="https://elfaroplaza.com/wp-content/uploads/2021/12/reparacion-celulares-los-angeles-swap-meet.jpg"
              alt="cambio de pantalla"
            />
          </div>
          <div className="text-servicios">
            <h3>🔧 Reparación de Pantallas:</h3>
            <p>
              Si tu pantalla está quebrada o no responde, la reemplazamos con
              piezas originales de alta calidad para garantizar un
              funcionamiento perfecto.
            </p>
          </div>
        </div>
        <div className="servicios-container">
          <div className="image-servicios">
            <img
              src="https://lamanzanamordida.net/app/uploads-lamanzanamordida.net/2020/02/precio-bateria-iphone.jpg"
              alt="cambio de batería"
            />
          </div>
          <div className="text-servicios">
            <h3>🔋 Cambio de Baterías:</h3>
            <p>
              Si la batería de tu celular ya no dura lo suficiente, te ayudamos
              a poner una nueva que le devuelva la energía que necesita.
            </p>
          </div>
        </div>
        <div className="servicios-container">
          <div className="image-servicios">
            <img
              src="https://comocomprar.cl/wp-content/uploads/2022/08/Desbloquear-Celular.png"
              alt="liberación"
            />
          </div>
          <div className="text-servicios">
            <h3>🔓 Liberación de Celulares:</h3>
            <p>
              ¿Quieres usar tu celular con cualquier compañía? Ofrecemos el
              servicio de liberación de equipos para que puedas disfrutar de la
              libertad de elegir tu proveedor.
            </p>
          </div>
        </div>
        <div className="servicios-container">
          <div className="image-servicios">
            <img
              src="https://www.cicap.edu.mx/cursosenlinea/wp-content/uploads/2022/08/celll-850x560.png"
              alt="reparaciones"
            />
          </div>
          <div className="text-servicios">
            <h3>⚙️ Reparaciones Generales:</h3>
            <p>
              Ya sea que tu celular no encienda, tenga problemas con el audio,
              cámaras o cualquier otro inconveniente, nosotros tenemos la
              solución.
            </p>
          </div>
        </div>
        <hr />
        <p className="resaltar-parrafo">
          ¿Por qué elegirnos?
          <br />
          <ul>
            <li>Reparaciones rápidas y con calidad garantizada.</li>
            <li>
              Técnicos especializados con experiencia en todas las marcas.
            </li>
            <li>Precios competitivos y sin sorpresas.</li>
            <li>
              Asesoramiento personalizado para que tomes las mejores decisiones
              para tu celular.
            </li>
          </ul>
          <br />
          ¡Recupéralo ya! No dejes que los problemas de tu celular te detengan.
          Contáctanos hoy mismo y deja que nuestros expertos lo devuelvan a su
          mejor estado. ¡Tu celular merece el mejor cuidado!
        </p>

        <hr />
      </section>

      {/* seccion galeria */}
      <section id="productos">
        <h2 color="#FFFfff">Galería</h2>
        <div className="products-container"></div>
      </section>

      {/* seccion acerca de */}
      {/*<section id="productos">
        <h2 color="#FFFfff">Sobre Servicel Salamá</h2>
        <div className="products-container">
          <p>
            
          </p>
        </div>
      </section> */}

      {/* seccion ubicación */}
      <section id="ubicacion">
        <h2 color="#FFFfff">Ubicación</h2>
        <div className="parent-container">
          <div className="iframe-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d425.7642485640927!2d-90.3223661517491!3d15.104128195108933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2sgt!4v1742341904409!5m2!1ses-419!2sgt"
              width="600"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* seccion contacto */}
      <section id="contacto">
        <h2 color="#FFFfff">Contacto</h2>
        <div className="products-container">
          <div class="form-container">
            <form class="form">
              <div class="form-group">
                <label for="textarea">¿Cuál es tu nombre?</label>
                <input type="text" id="nombre" name="nombre" required="" />
              </div>
              <div class="form-group">
                <label for="textarea">¿Cuál es tu consulta?</label>
                <textarea
                  name="textarea"
                  id="textarea"
                  rows="10"
                  cols="50"
                  required=""
                >
                  {" "}
                </textarea>
              </div>
              <span>Tu consulta será enviada por WhatsApp</span>
              <button class="form-submit-btn" type="submit">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <div className="footer">
          <p>
            <span>© 2025 Nexus.Dev - Servicel Salamá</span>
          </p>
        </div>
      </section>
    </>
  );
}

export default App;
