
// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-lg font-bold">Wilfredo y Fany</p>
                    <p className="text-sm">12 de Octubre 2024</p>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-sm">Hecho con amor por Grupo Peanuts. © Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
