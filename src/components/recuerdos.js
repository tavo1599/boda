import React, { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Album from './Album';
import { API_URL } from './env';

const Recuerdo = () => {
    const [comment, setComment] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showAlbum, setShowAlbum] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    const handleCustomFileClick = () => {
        fileInputRef.current.click();
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('comment', comment);

        try {
            const response = await axios.post(`${API_URL}/images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            console.log('Success:', response.data);
            Swal.fire({
                title: '¡Éxito!',
                text: 'Tu imagen se ha cargado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            setComment('');
            setImageFile(null);
            setImagePreview(null);
            setUploadProgress(0);
        } catch (error) {
            console.error('Error uploading image:', error);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al cargar la imagen.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleAlbumClick = () => {
        setShowAlbum(true);
    };

    const handleCloseAlbum = () => {
        setShowAlbum(false);
    };

    return (
        <div id="recuerdo" className="flex justify-center items-center min-h-screen bg-fuchsia-200 text-black">
            <div className="p-8 rounded-lg flex flex-col md:flex-row">
                <div className="flex-1">
                    <div className="flex justify-center">
                        <img src="/miboda/images/camara.png" alt="Icono" className="w-20 h-20 mb-4" />
                    </div>
                    <h1 className="text-6xl font-bold mb-4 text-center">¡Comparte tus Recuerdos!</h1>
                    <p className="text-lg mb-6 text-center">
                        Queremos que todos los momentos especiales sean recordados. ¡Comparte tus fotos y comentarios sobre la celebración!
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <button 
                                type="button"
                                onClick={handleCustomFileClick} 
                                className="w-full p-2 border border-gray-300 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-700"
                            >
                                Sube tu recuerdo
                            </button>
                        </div>
                        {imagePreview && (
                            <div className="mb-4 flex justify-center">
                                <img src={imagePreview} alt="Vista previa" className="w-32 h-32 object-cover rounded" />
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-lg font-medium mb-2">Comentario</label>
                            <textarea 
                                value={comment} 
                                onChange={handleCommentChange} 
                                className="w-full p-2 border border-gray-300 rounded"
                                rows="4"
                            ></textarea>
                        </div>
                        {uploadProgress > 0 && (
                            <div className="mb-4">
                                <div className="text-center mb-1">Tu foto está siendo cargada</div>
                                <div className="bg-gray-300 rounded-full">
                                    <div
                                        className="bg-green-600 text-xs font-medium text-center text-white leading-none rounded-full"
                                        style={{ width: `${uploadProgress}%` }}
                                    >
                                        {uploadProgress}%
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                            <button 
                                type="submit" 
                                className="px-6 py-3 bg-green-600 text-white font-bold rounded hover:bg-cyan-700"
                                disabled={!imageFile || uploadProgress > 0} // Deshabilitar si no hay imagen o si está en carga
                            >
                                Enviar
                            </button>
                            <button 
                                type="button"
                                onClick={handleAlbumClick} 
                                className="px-6 py-3 bg-cyan-600 text-white font-bold rounded hover:bg-green-700"
                            >
                                Album
                            </button>
                        </div>
                    </form>
                    {showAlbum && <Album onClose={handleCloseAlbum} />}
                </div>
            </div>
        </div>
    );
};

export default Recuerdo;
