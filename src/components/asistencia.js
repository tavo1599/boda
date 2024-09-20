// src/components/Asistencia.js
import React, { useState, useRef } from 'react';
import Confirmacion from './confirmacion'; // Importa el componente Confirmacion

const Asistencia = () => {
    const [showForm, setShowForm] = useState(false);
    const asistenciaRef = useRef(null);

    return (
        <div id="asistencia" className="py-24 px-4 text-center" ref={asistenciaRef}>
            {!showForm ? (
                <div>
                    <h1 className="text-7xl font-dancing-script font-bold mb-8">¡Lo celebramos contigo!</h1>
                    <p className="text-lg mx-auto max-w-2xl mb-8">
                        La celebración no sería lo mismo sin ti. Haznos saber si planeas asistir a través del enlace de RSPV a continuación, y anota cualquier restricción dietética o petición especial.
                    </p>
                    <button 
                        className="mt-4 px-6 py-3 text-white font-bold hover:bg-cyan-600 rounded-full border-2"
                        onClick={() => setShowForm(true)}
                    >
                        RSVP
                    </button>
                </div>
            ) : (
                <div>
                    <Confirmacion /> {/* Muestra el formulario cuando se hace clic en RSVP */}
                </div>
            )}
        </div>
    );
};

export default Asistencia;
