import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './env';

const Album = ({ onClose }) => {
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const imagesPerPage = 9;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${API_URL}/images`);
                console.log('Fetched images:', response.data);
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const handleCloseFullscreen = () => {
        setSelectedImageIndex(null);
    };

    const nextImage = () => {
        if (selectedImageIndex < images.length - 1) {
            setSelectedImageIndex((prev) => prev + 1);
        }
    };

    const prevImage = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex((prev) => prev - 1);
        }
    };

    const handleSwipe = (e) => {
        const touchStartX = e.touches[0].clientX;
        let touchEndX;

        const handleTouchMove = (event) => {
            touchEndX = event.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            if (touchEndX < touchStartX) {
                nextImage();
            } else if (touchEndX > touchStartX) {
                prevImage();
            }
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(images.length / imagesPerPage) - 1));
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const startIndex = currentPage * imagesPerPage;
    const displayedImages = images.slice(startIndex, startIndex + imagesPerPage);

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 overflow-auto">
            <div className="flex justify-end p-4">
                <button onClick={onClose} className="bg-red-500 text-white rounded p-2 hover:bg-red-600 fixed top-4 right-4 z-10">Cerrar el Album</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-16">
                {displayedImages.length > 0 ? (
                    displayedImages.map((image, index) => (
                        <div key={image.id} className="relative">
                            <img
                                src={`https://maniscode.online${image.image_path}`} 
                                alt="Recuerdo"
                                className="w-full h-48 object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                                onClick={() => handleImageClick(startIndex + index)}
                            />
                            {/* Muestra solo la fecha de carga */}
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 text-sm rounded-bl-lg rounded-br-lg">
                                {new Date(image.created_at).toLocaleDateString()} {/* Asegúrate de que el campo sea el correcto */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-white col-span-full">No hay imágenes en el álbum.</p>
                )}
            </div>

            <div className="flex justify-center p-4">
                <button 
                    onClick={prevPage} 
                    className={`bg-blue-500 text-white rounded p-4 hover:bg-blue-600 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === 0}
                >
                    &#10094; Regresar
                </button>
                <button 
                    onClick={nextPage} 
                    className={`bg-blue-500 text-white rounded p-4 hover:bg-blue-600 ${startIndex + imagesPerPage >= images.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={startIndex + imagesPerPage >= images.length}
                >
                    Siguiente &#10095;
                </button>
            </div>

            {selectedImageIndex !== null && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-60"
                    onTouchStart={handleSwipe}
                >
                    <img
                        src={`https://maniscode.online${images[selectedImageIndex].image_path}`}
                        alt="Imagen ampliada"
                        className="max-w-full max-h-screen cursor-pointer"
                        onClick={handleCloseFullscreen}
                    />
                    <button 
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white rounded p-4 hover:bg-blue-600"
                        onClick={handleCloseFullscreen}
                    >
                        Regresar al Álbum
                    </button>

                    {/* Flechas de navegación */}
                    <div className="absolute left-4 right-4 flex justify-between">
                        {selectedImageIndex > 0 && (
                            <button 
                                onClick={prevImage} 
                                className="bg-gray-700 text-white rounded-full p-4 hover:bg-gray-600 transition duration-200"
                            >
                                &#10094;
                            </button>
                        )}
                        {selectedImageIndex < images.length - 1 && (
                            <button 
                                onClick={nextImage} 
                                className="bg-gray-700 text-white rounded-full p-4 hover:bg-gray-600 transition duration-200"
                            >
                                &#10095;
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Album;
