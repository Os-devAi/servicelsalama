import React from 'react'
import './Products.css'

const Products = ({ producto }) => {

    const formatCurrency = (amount) => {
        amount = parseFloat(amount);

        if (isNaN(amount)) {
            return 'Invalid amount';
        }

        let formattedAmount = amount.toFixed(2).toString().split('.');

        formattedAmount[0] = formattedAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return 'Q.' + formattedAmount.join('.');
    };

    //handleWhatsApp Products
    const handleWhatsApp = () => {
        if (!producto) {
            alert("Producto no encontrado");
            return;
        }

        // Construcción del mensaje
        let message = "Buenos días\n";
        message += "Estoy interesado en: \n";
        message += "Producto: " + producto.nombre + "\n";
        message += "Precio: " + formatCurrency(producto.precio) + "\n";

        // Codificar el mensaje para la URL
        const encodedMessage = encodeURIComponent(message);

        // Construir la URL de WhatsApp
        const whatsappUrl = `https://wa.me/50257471313?text=${encodedMessage}`;

        // Abrir en una nueva pestaña
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className="card">
            <div className="image_container">
                <img className='image' src={producto.imagen} alt={producto.nombre} />
            </div>
            <div className="title">
                <span>{producto.nombre}</span>
            </div>
            <div className="action">
                <div className="price">
                    <span>{formatCurrency(producto.precio)}</span>
                </div>
                <button className="cart-button" onClick={handleWhatsApp}>
                    <svg
                        className="cart-icon"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        ></path>
                    </svg>
                    <span>comprar</span>
                </button>
            </div>
        </div>
    )
}

export default Products;
