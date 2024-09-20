// src/components/Header.js
import React from 'react';
import Countdown from './Countdown'; // Asegúrate de importar el componente Countdown


const Header = () => {
    const targetDate = "2024-10-12T00:00:00";

    const scrollToAsistencia = () => {
        const asistenciaElement = document.getElementById('asistencia');
        if (asistenciaElement) {
            // Scroll suavemente con alineación centrada
            asistenciaElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center text-center p-8 min-h-screen">
            {/* Imagen de fondo con gradiente */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5)), url(/miboda/images/image3.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Contenedor principal con marco transparente */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center mt-20 font-serif">
                {/* Marco transparente con fecha y nombres */}
                <div className="bg-white bg-opacity-60 border-4 border-white p-6 rounded-lg shadow-lg relative">
                    <div className="mb-4">
                        <p className="text-lg md:text-xl font-bold text-custom-brown">{targetDate.split('T')[0]}</p>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-custom-brown mb-4 p-4 inline-block tracking-widest font-elegant">
                        Wilfredo & Fany
                    </h1>

                    {/* Botón "Asistir" */}
                    <a
                        href="#asistencia"
                        onClick={(e) => {
                            e.preventDefault(); // Evita el comportamiento por defecto del ancla
                            scrollToAsistencia();
                        }}
                        className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 bg-custom-brown text-white py-2 px-6 rounded-lg shadow-lg font-bold text-lg transition-transform transform hover:scale-105 hover:bg-white hover:text-custom-brown hover:shadow-xl"
                    >
                        Asistir
                    </a>
                </div>

               
                
            </div>

            {/* Contador de cuenta regresiva */}
            <div className="mb-7 w-full py-10 text-white z-0">
                <Countdown targetDate={targetDate} />
            </div>
        </div>
    );
};

export default Header;