import React, { useState } from 'react';

import axios from 'axios';
import { API_URL } from './env';
import Swal from 'sweetalert2';
import useFetch from './useFetch';

const Mesa = ({ numGuests, name, guestId }) => {
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { data } = useFetch("tables");
    const tables = data?.tables || [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const table = tables.find(table => table.id === Number(selectedTableId));
        if (!table) {
            Swal.fire({
                title: "Error",
                text: "Por favor, selecciona una mesa válida.",
                icon: "error"
            });
            return;
        }

        const availableSeats = table.table_capacity - (table.guests?.length || 0);
        if (availableSeats < numGuests) {
            Swal.fire({
                title: "Mesa Llena",
                text: "No hay suficientes asientos disponibles en esta mesa.",
                icon: "warning"
            });
            return;
        }

        const data = {
            table_id: selectedTableId,
            number_of_people: numGuests
        };
        try {
            const response = await axios.put(`${API_URL}/guests/${guestId}`, data);
            if (response.status === 200) {
                Swal.fire({
                    title: "Sillas seleccionadas exitosamente!",
                    text: "Selecciona tu mesa y la cantidad que ocuparás",
                    icon: "success"
                }).then(() => {
                    setShowConfirmation(true);
                });
            }
        } catch (error) {
            console.error("Ocurrió un error:", error);
            Swal.fire({
                title: "Error",
                text: "La Mesa esta llena.",
                icon: "error"
            });
        }
    };

    const handleTableClick = (tableId) => {
        setSelectedTableId(tableId);
    };

    const renderTable = (index, type, label, tableId) => {
        const isTable = type === 'table';
        const shapeClass = type === 'label' ? 'w-48 h-24' : 'w-24 h-24 rounded-full';
        const bgColorClass = selectedTableId === tableId ? 'border-cyan-400' : 'border-gray-400';
        const table = tables.find(t => t.id === Number(tableId)); // Encuentra la mesa por ID

        if (type === 'label') {
            return (
                <div
                    key={index}
                    className={`flex items-center justify-center cursor-default border-2 ${shapeClass} border-gray-400 bg-slate-500 text-center`}
                >
                    {label}
                </div>
            );
        }

        if (!table) return null;

        const availableSeats = table.table_capacity - (table.guests?.length || 0);
        const tableOccupied = availableSeats === 0;

        if (tableOccupied) {
            return (
                <div
                    key={index}
                    className="flex items-center justify-center w-24 h-24 rounded-full cursor-not-allowed border-2 border-cyan-400 bg-white text-red-600"
                >
                    {isTable ? `Mesa ${tableId}` : label} ocupada
                </div>
            );
        }

        return (
            <div
                key={index}
                className={`flex items-center justify-center cursor-pointer border-2 ${shapeClass} ${bgColorClass}`}
                onClick={() => isTable && handleTableClick(tableId)}
            >
                {isTable ? `Mesa ${tableId}` : label}
            </div>
        );
    };

    const tablesLayout = [
        { type: 'special', id: 'special-1' }, { type: 'special', id: 'special-2' },
        { type: 'label', label: 'Mesa Central', id: 'central' }, { type: 'special', id: 'special-3' }, { type: 'special', id: 'special-4' },
        { type: 'empty' }, { type: 'special', id: 'special-5' }, { type: 'empty' }, { type: 'special', id: 'special-6' }, { type: 'empty' },
        ...tables.slice(0, 2).map(table => ({ type: 'table', id: table.id.toString() })), { type: 'empty' },
        ...tables.slice(10, 12).map(table => ({ type: 'table', id: table.id.toString() })),
        ...tables.slice(2, 4).map(table => ({ type: 'table', id: table.id.toString() })), { type: 'empty' },
        ...tables.slice(12, 14).map(table => ({ type: 'table', id: table.id.toString() })),
        ...tables.slice(4, 6).map(table => ({ type: 'table', id: table.id.toString() })), { type: 'empty' },
        ...tables.slice(14, 16).map(table => ({ type: 'table', id: table.id.toString() })),
        ...tables.slice(6, 8).map(table => ({ type: 'table', id: table.id.toString() })), { type: 'empty' },
        ...tables.slice(16, 18).map(table => ({ type: 'table', id: table.id.toString() })),
        ...tables.slice(8, 10).map(table => ({ type: 'table', id: table.id.toString() })), { type: 'empty' },
        ...tables.slice(18, 20).map(table => ({ type: 'table', id: table.id.toString() })),
        { type: 'empty' }, ...tables.slice(20, 22).map(table => ({ type: 'table', id: table.id.toString() })),
        { type: 'table', id: tables[22]?.id.toString() }, { type: 'table', id: tables[23]?.id.toString() },
        { type: 'label', label: 'Entrada', shape: 'rectangle', id: 'entrance' }, { type: 'empty' }, { type: 'label', label: 'SSHH', shape: 'rectangle', id: 'sshh' },
        { type: 'label', label: 'Orquesta', shape: 'rectangle', id: 'orchestra' }
    ];

    return (
        <div className="p-4">
            {showConfirmation ? (
                <div className="text-center bg-neutral-700 text-pink-200">
                    <div className="flex justify-center">
                    <img src="/miboda/images/confirmar-asistencia.png" alt="Icono" className="w-24 h-24 mb-4 my-9" />
                    </div>
                    <h1 className="text-2xl font-bold mb-4 ">¡Confirmación de Asistencia!</h1>
                    <p className="text-lg mb-4 ">Tu selección de mesa y sillas ha sido registrada con éxito.</p>
                    <p className="text-lg py-8">¡Gracias por confirmar tu asistencia!</p>
                </div>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-4xl font-bold mb-4 text-center">Selecciona tu Mesa</h1>
                        <div className="grid grid-cols-5 gap-4 mb-8">
                            {tablesLayout.map((table, index) => (
                                <div key={index} className="flex items-center justify-center">
                                    {renderTable(index, table.type, table.label, table.id)}
                                </div>
                            ))}
                        </div>
                        {selectedTableId !== null && tables.find(table => table.id === Number(selectedTableId)) && (
                            <>
                                <h2 className="text-2xl font-semibold mb-4 text-center">Mesa {selectedTableId} - Invitados</h2>
                                <div className="flex flex-wrap justify-center gap-2 mb-8">
                                    {tables.find(table => table.id === Number(selectedTableId))?.guests?.map((guest, index) => (
                                        <div key={index} className="w-32 h-10 flex items-center justify-center rounded-full border-2 bg-cyan-600 text-white">
                                            {guest.name} {guest.lastname}
                                        </div>
                                    )) || <div className="w-32 h-10 flex items-center justify-center rounded-full border-2 bg-gray-200 text-black">No hay invitados</div>}
                                </div>

                                <div className="text-center mt-8">
                                    <button
                                        type='submit'
                                        className="px-6 py-3 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700"
                                    >
                                        Registrar
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </>
            )}
        </div>
    );
};

export default Mesa;
