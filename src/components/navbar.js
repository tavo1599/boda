// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };

    return (
        <nav className="w-full mx-auto max-w-full fixed top-0 left-0 right-0 bg-gradient-to-r from-[#705d5d] via-[#a486a9] to-[#264663] py-4 shadow-lg z-50">
            <div className="flex items-center justify-between px-4">
                <div className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Great Vibes, cursive' }}>
                    W + F
                </div>
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <div className="hidden md:flex space-x-6">
                    <a href="#asistencia" onClick={(e) => { e.preventDefault(); scrollToSection('asistencia'); }} className="font-bold text-white hover:text-[#FFD700] transition">CONFIRMA TU ASISTENCIA</a>
                    <a href="https://wa.me/906771606" className="font-bold text-white hover:text-[#FFD700] transition" target="_blank" rel="noopener noreferrer">CONTÁCTANOS</a>
                    <a href="#recuerdo" onClick={(e) => { e.preventDefault(); scrollToSection('recuerdo'); }} className="font-bold text-white hover:text-[#FFD700] transition">LIBRO DE RECUERDOS</a>
                </div>
            </div>
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
                <ul className="flex flex-col items-center space-y-4 mt-4 text-center">
                    <li><a href="#asistencia" onClick={(e) => { e.preventDefault(); scrollToSection('asistencia'); }} className="font-bold text-white hover:text-[#FFD700] transition">CONFIRMA TU ASISTENCIA</a></li>
                    <li><a href="https://wa.me/906771606" className="font-bold text-white hover:text-[#FFD700] transition" target="_blank" rel="noopener noreferrer">CONTÁCTANOS</a></li>
                    <li><a href="#recuerdo" onClick={(e) => { e.preventDefault(); scrollToSection('recuerdo'); }} className="font-bold text-white hover:text-[#FFD700] transition">LIBRO DE RECUERDOS</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;