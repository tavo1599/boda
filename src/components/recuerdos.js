import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

const Recuerdo = () => {
    const [file, setFile] = useState(null);
    const [comment, setComment] = useState('');
    const [preview, setPreview] = useState('');
    const [showGallery, setShowGallery] = useState(false);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filesPerPage] = useState(8); // Ahora se muestran 8 imágenes por página
    const [fullScreenImageIndex, setFullScreenImageIndex] = useState(null); 
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        
        // Mostrar vista previa del archivo si es una imagen
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(''); // Limpiar vista previa si el archivo no es una imagen
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'Por favor, selecciona un archivo antes de enviar.',
            });
            return;
        }

        const formData = new FormData();
        formData.append('images[]', file);
        formData.append('comment', comment);

        try {
            const response = await fetch('http://localhost:8000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Archivo subido exitosamente.',
                }).then(() => {
                    // Opcional: Resetear el formulario
                    setFile(null);
                    setComment('');
                    setPreview('');
                    fileInputRef.current.value = null;
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al subir el archivo.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de red',
                text: 'No se pudo conectar con el servidor.',
            });
        }
    };

    const handleCustomFileClick = () => {
        fileInputRef.current.click();
    };

    const handleViewAllClick = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/upload');
            const result = await response.json();
            if (response.ok) {
                setGalleryFiles(result.files.map(fileUrl => `http://localhost:8000/storage/uploads/${fileUrl.split('/').pop()}`));
                setShowGallery(true);
                setCurrentPage(1); // Reiniciar a la primera página
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar las imágenes.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de red',
                text: 'No se pudo conectar con el servidor.',
            });
        }
    };

    const handleCloseGallery = () => {
        setShowGallery(false);
    };

    const handleImageClick = (index) => {
        setFullScreenImageIndex(index);
    };

    const handleCloseFullScreen = () => {
        setFullScreenImageIndex(null);
    };

    const handleNextImage = () => {
        setFullScreenImageIndex((prevIndex) => (prevIndex + 1) % galleryFiles.length);
    };

    const handlePreviousImage = () => {
        setFullScreenImageIndex((prevIndex) => (prevIndex - 1 + galleryFiles.length) % galleryFiles.length);
    };

    // Calcular las imágenes que se deben mostrar en la página actual
    const indexOfLastFile = currentPage * filesPerPage;
    const indexOfFirstFile = indexOfLastFile - filesPerPage;
    const currentFiles = galleryFiles.slice(indexOfFirstFile, indexOfLastFile);

    // Manejar el cambio de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div id="recuerdo" className="flex justify-center  items-center py-20  text-white">
            <div className="p-8 rounded-lg flex flex-col md:flex-row">
                <div className="flex-1">
                    <div className="flex justify-center ">
                        <img src="/miboda/images/camararosada.png" alt="Icono" className="w-20 h-20 mb-4" />
                    </div>
                    <h1 className="text-7xl font-dancing-script font-bold mb-4 text-center">¡Comparte tus Recuerdos!</h1>
                    <p className="text-lg mb-6 text-center">
                        Queremos que todos los momentos especiales sean recordados. ¡Comparte tus fotos y comentarios sobre la celebración!
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileChange} 
                                className="hidden"
                            />
                            <button 
                                type="button"
                                onClick={handleCustomFileClick} 
                                className="w-full p-2 border border-gray-300 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-700"
                            >
                                Sube tu recuerdo
                            </button>
                            {preview && (
                                <div className="mt-4 flex justify-center">
                                    <img src={preview} alt="Vista previa" className="w-96 h-auto max-w-full max-h-96 object-contain rounded" />
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium mb-2">Comentario</label>
                            <textarea 
                                value={comment} 
                                onChange={handleCommentChange} 
                                className="w-full p-2 border border-gray-300 rounded"
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="flex justify-between items-center">
                            <button 
                                type="submit" 
                                className="px-6 py-3 bg-green-600 text-white font-bold rounded hover:bg-cyan-700"
                            >
                                Enviar
                            </button>
                            <button 
                                type="button"
                                onClick={handleViewAllClick}
                                className="px-6 py-3 bg-cyan-600 text-white font-bold rounded hover:bg-green-700"
                            >
                                Album
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showGallery && (
                <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
                    <button 
                        onClick={handleCloseGallery}
                        className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700"
                    >
                        Cerrar
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full overflow-auto max-h-[70vh]">
                        {currentFiles.length > 0 ? (
                            currentFiles.map((fileUrl, index) => (
                                <div key={index} className="w-full h-auto max-w-full max-h-64 p-2 border rounded cursor-pointer" onClick={() => handleImageClick(indexOfFirstFile + index)}>
                                    <img src={fileUrl} alt={`Imagen ${index + 1}`} className="w-full h-full object-contain rounded" />
                                </div>
                            ))
                        ) : (
                            <p>No hay imágenes para mostrar.</p>
                        )}
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button 
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-600 text-white font-bold rounded hover:bg-gray-700"
                        >
                            Anterior
                        </button>
                        <span className="mx-4 text-lg">{currentPage}</span>
                        <button 
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastFile >= galleryFiles.length}
                            className="px-4 py-2 bg-gray-600 text-white font-bold rounded hover:bg-gray-700"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
            {fullScreenImageIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
                    <button 
                        onClick={handleCloseFullScreen}
                        className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700"
                    >
                        Cerrar
                    </button>
                    <div className="relative">
                        <img src={galleryFiles[fullScreenImageIndex]} alt={`Imagen ${fullScreenImageIndex + 1}`} className="w-full max-w-4xl h-auto max-h-[80vh] object-contain rounded" />
                        <button 
                            onClick={handlePreviousImage}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-600 text-white font-bold rounded hover:bg-gray-700"
                        >
                            Anterior
                        </button>
                        <button 
                            onClick={handleNextImage}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-600 text-white font-bold rounded hover:bg-gray-700"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recuerdo;