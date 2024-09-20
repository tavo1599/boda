import React from 'react';


const Detalles = () => {
 return (
    <div className="px-4 py-28 bg-fuchsia-200 text-center text-black">
            <h1 className="text-7xl font-dancing-script font-bold mb-20">Detalles de la boda</h1>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                <div className="flex-1">
                <div className="flex justify-center">
                <img src="/miboda/images/iglesia.png"  alt="Icono" className="w-20 h-20 mb-4" />
                </div>
                    <h2 className="text-2xl font-serif font-semibold mb-2">Ceremonia</h2>
                    <p className="text-4xl font-semibold">10 am</p>
                    <p className="text-lg">Iglesia: Templo Matriz de Santa Catalina</p>
                    <a
                        href="https://maps.app.goo.gl/cvujk3qg8iXQ6Yin7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:underline"
                    >
                        Ubicación en el mapa
                    </a>
                </div>
                <div className="flex justify-center">
                <img src="/miboda/images/corazon.png"  alt="Icono" className="w-11 h-11 mb-4" />
                </div>
                <div className="flex-1">
                <div className="flex justify-center">
                <img src="/miboda/images/fiesta.png" alt="Icono" className="w-20 h-20 mb-4" />
                </div>
                    <h2 className="text-2xl font-serif font-semibold mb-2">Recepción</h2>
                    <p className="text-4xl font-semibold">1 pm</p>
                    <p className="text-lg">Dirección: Local 'Florentina', Jr. Carabaya Nº 613</p>
                    <a
                        href="https://maps.app.goo.gl/QQ1KoTjDBcbHaUZe6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:underline"
                    >
                        Ubicación en el mapa
                    </a>
                </div>
            </div>
        </div>
 );
};
export default Detalles;