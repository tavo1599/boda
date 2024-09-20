import React from 'react';

const MesaDeRegalos = () => {
    return (
        <div className="py-28 flex items-center justify-center bg-fuchsia-200 text-white ">
            <div className="p-6 bg-sky-900 rounded-lg max-w-xl text-center shadow-lg border-4 border-amber-600 ">
            <div className='flex justify-center'>
                <img src="/miboda/images/caja.png"  alt="Icono" className="w-14 h-14 mb-6"  />
                </div>
                <h2 className="text-3xl font-dancing-script font-bold mb-0">Mesa de Regalos</h2>
                <div className='flex justify-center'>
                <img src="/miboda/images/linea.webp"  alt="Icono" className="w-64 h-30 -mt-8 -mb-8" />
                </div>
                <p className="text-lg mb-6">
                Sin ti esto no sería igual. Gracias por tu compañía en esta nueva etapa que comenzamos. 
            El regalo es opcional, la asistencia obligatoria. Pero si quieres tener un detalle con nosotros, 
            qué mejor regalo que nuestra luna de miel.
                </p>
                <div className="text-left mb-4">
                    <p className="text-lg font-bold">Cuenta Ahorro Sueldo Soles en Interbank:</p>
                    <p className="text-lg">3003060657761</p>
                </div>
                <div className="text-left mb-4">
                    <p className="text-lg font-bold">Cuenta Interbancario (CCI) en Interbank:</p>
                    <p className="text-lg">00330001306065776112</p>
                </div>
                
            </div>
        </div>
    );
};

export default MesaDeRegalos;
