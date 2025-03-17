import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import phoneMaintenance from './assets/phone_maintenance_1.png';
import apple from './assets/apple.png';
import samsung from './assets/samsung.png';
import motorola from './assets/motorola.png';
import xiaomi from './assets/xiaomi.png';
import Products from './components/Products';
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";

function TypewriterEffect({ text, speed = 100 }) {

  const [displayedText, setDisplayedText] = useState('');
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
        const querySnapshot = await getDocs(collection(db, "productos_servicel"));
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
          <a href="">Servicios</a>
          <a href="">Galería</a>
          <a href="">Acerca de</a>
        </div>
      </div>

      {/* Sección principal con animaciones */}
      <div className="home-main">
        {/* Animación del texto */}
        <motion.div
          className="home-main-text"
          initial={{ opacity: 0, y: 50 }}  // Comienza invisible y desplazado hacia abajo
          animate={{ opacity: 1, y: 0 }}  // Se vuelve visible y sube suavemente
          transition={{ duration: 1 }}  // Duración de la animación
        >
          <h1 className='title-main'>
            Te ayudamos a reparar <br />
            tu smartphone y tablet.
          </h1>
          <p>
            Expertos en Reparación de Celulares por Más de 20 Años <br />
            Pantallas, baterías, software y más. ¡Cotiza tu reparación hoy y recupera tu celular como nuevo!
          </p>

          <div className="btton-container">
            <button class="contactButton"
              whileHover={{ scale: 1.1 }}  // Efecto hover (crece)
              whileTap={{ scale: 0.9 }}>
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
          </div>
        </motion.div>

        {/* Animación de la imagen */}
        <motion.div
          className="home-main-img"
          initial={{ opacity: 0, x: 100 }}  // Comienza invisible y desplazado a la derecha
          animate={{ opacity: 1, x: 0 }}  // Se vuelve visible y se mueve suavemente
          transition={{ duration: 1, delay: 0.5 }}  // Retraso en la animación
        >
          <motion.img
            className='image-main'
            src={phoneMaintenance}
            alt="phone_maintenance"
            initial={{ scale: 0.8 }}  // Aparece más pequeño
            animate={{ scale: 1 }}  // Luego se expande a tamaño normal
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </div>

      {/* marcas */}
      <div className="marcas-container">
        <img className='image-marca' src={samsung} alt="logo samsung" />
        <img className='image-marca' src={apple} alt="logo apple" />
        <img className='image-marca' src={motorola} alt="logo motorola" />
        <img className='image-marca' src={xiaomi} alt="logo xiaomi" />
      </div>

      {/* Sección de productos */}
      <section id='secc-productos'>
        <h2 style={{ color: '#FFFFFF' }}>Algunos Productos</h2>
        <div className="products-container">
          {producto.length > 0 ? (
            producto.map((item) => <Products key={item.id} producto={item} />)
          ) : (
            <p>Cargando productos...</p>
          )}
        </div>

      </section>

      {/* seccion servicios */}
      <section id='productos'>
        <h2 color='#FFFfff'>Nuestros Servicios</h2>
        <div className="products-container">

        </div>
      </section>

      {/* seccion galeria */}
      <section id='productos'>
        <h2 color='#FFFfff'>Galería</h2>
        <div className="products-container">

        </div>
      </section>

      {/* seccion acerca de */}
      <section id='productos'>
        <h2 color='#FFFfff'>Sobre Servicel Salamá</h2>
        <div className="products-container">

        </div>
      </section>

      {/* seccion contacto */}
      <section id='productos'>
        <h2 color='#FFFfff'>Contacto</h2>
        <div className="products-container">

        </div>
      </section>
    </>
  );
}

export default App;