// src/components/Confirmacion.js
import React, { useState } from 'react';
import Mesa from './mesa';
import useFetch from './useFetch';
import axios from 'axios';
import { API_URL } from './env';
import Swal from 'sweetalert2'

const Confirmacion = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [numGuests, setNumGuests] = useState(1);
    const [dish, setDish] = useState('pollo');
    const [specialRequests, setSpecialRequests] = useState('');
    const [attending, setAttending] = useState(null);
    const [showMesa, setShowMesa] = useState(false);
    const [email, setEmail] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState({}); // Estado para los asientos seleccionados
    const [selectedTable, setSelectedTable] = useState(null); // Mesa seleccionada
    const [guestId, setGuestId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (attending === 'yes') {
            const data = {
                name: name,
                lastname: lastName,
                phone: phone,
                email: email,
                dish: dish,
                response: 'asistire',
                number_of_people: numGuests
            };

            try {
                const response = await axios.post(`${API_URL}/guests`, data);
                setGuestId(response.data.guest.id);
                Swal.fire({
                    title: "Gracias por acompañarnos " + response.data.guest.name + " !",
                    text: "Seleciona tu mesa y la cantidad que ocuparas",
                    icon: "success"
                });
                // // console.log('Guest creado:', response.data);
                setShowMesa(true);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    Swal.fire({
                        title: "Ocurrió un error!",
                        text: "Verifica los datos que estás enviando",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Ocurrió un error en el servidor!",
                        text: "Reportalo a 906771606",
                        icon: "error"
                    });
                }
                //   console.error('Error al crear el guest:', error);
                setShowMesa(false);
            }

        } else {
            const data = {
                name: name,
                lastname: lastName,
                phone: phone,
                response: 'no asistire'
            };

            try {
                const response = await axios.post(`${API_URL}/guests`, data);
                setGuestId(response.data.guest.id);
                Swal.fire({
                    title: "Lamentamos que no puedas acompañarnos " + response.data.guest.name,
                    text: "Esperamos poder compartir contigo en otra ocasión y celebrar juntos en el futuro.",
                    icon: "success"
                }).then(() => {
                    window.location.reload();
                });
                // console.log('Guest creado:', response.data);
                setShowMesa(false);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    Swal.fire({
                        title: "Ocurrió un error!",
                        text: "Verifica los datos que estás enviando",
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Ocurrió un error en el servidor!",
                        text: "Reportalo a 906771606",
                        icon: "error"
                    });
                }
                //   console.error('Error al crear el guest:', error);
                setShowMesa(false);
            }
        }


    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-neutral-800 text-pink-200 rounded">
            {!showMesa ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">¿Asistirás?</label>
                        <div className="flex space-x-4 justify-center mb-4">
                            <label>

                                <input
                                    type="radio"
                                    name="attending"
                                    className='rounded-none '
                                    value="yes"
                                    checked={attending === 'yes'}
                                    onChange={() => setAttending('yes')}
                                />
                                Sí
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="attending"
                                    value="no"
                                    checked={attending === 'no'}
                                    onChange={() => setAttending('no')}
                                />
                                No
                            </label>
                        </div>
                    </div>

                    {attending === 'no' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-neutral-700"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Apellidos</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-neutral-700"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Número de teléfono</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-neutral-700"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700"
                            >
                                Enviar
                            </button>
                        </>
                    )}

                    {attending === 'yes' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-neutral-700"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Apellidos</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-neutral-700"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Número de teléfono</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-neutral-700"
                                    maxLength={9}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Número de asistentes</label>
                                <input
                                    type="number"
                                    value={numGuests}
                                    onChange={(e) => setNumGuests(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-neutral-700"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-lg font-medium mb-2">Plato a servirse</label>
                                    <select
                                        value={dish}
                                        onChange={(e) => setDish(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded bg-neutral-700"
                                    >
                                        <option value="pollo">Pollo</option>
                                        <option value="cerdo">Chancho</option>
                                        <option value="res">Res</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Peticiones especiales</label>
                                <textarea
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded bg-neutral-700"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-cyan-700 text-white font-bold rounded hover:bg-cyan-500"
                            >
                                Elegir Mesa
                            </button>
                        </>
                    )}
                </form>
            ) : (
                <Mesa
                    numGuests={numGuests}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    selectedTable={selectedTable}
                    setSelectedTable={setSelectedTable}
                    guestId={guestId}
                    name={name.split(' ')[0]} // Pasar el primer nombre
                />
            )}
        </div>
    );
};

export default Confirmacion;