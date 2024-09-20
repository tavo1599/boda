
import React, { useState, useEffect, useCallback } from 'react';

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const isTimeUp = Object.values(timeLeft).every((value) => value === 0);

  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      <div className="relative flex items-center justify-center w-80 h-80 bg-white bg-opacity-90 rounded-full shadow-lg">
        {/* Imagen de hojas doradas alrededor del borde */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/miboda/images/hojas2.png" 
            alt="Hojas doradas" 
            className="absolute inset-[-10%] w-[120%] h-[120%]"
            style={{ 
              transform: 'scale(1.5)',
              transformOrigin: 'center',
              zIndex: -1 // Para que esté detrás del contenido pero en el borde
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          {isTimeUp ? (
            <h2 className="text-3xl font-extrabold mb-4 text-gray-800" style={{ fontFamily: 'Great Vibes, cursive' }}>¡Hoy es el gran día!</h2>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold mb-4 text-gray-800" style={{ fontFamily: 'Great Vibes, cursive' }}>Faltan:</h2>
              <div className="flex items-center space-x-2 text-orange-600 text-2xl font-extrabold">
                {Object.keys(timeLeft).map((unit, index) => {
                  const unitLabels = {
                    days: 'Días',
                    hours: 'Horas',
                    minutes: 'Minutos',
                    seconds: 'Segundos',
                  };
                  return (
                    <div key={unit} className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center  bg-opacity-50 rounded-full" style={{ color: 'rgba(255, 165, 0, 0.5)', fontSize: '2rem', fontWeight: 'bold' }}>
                        {timeLeft[unit]}
                      </div>
                      <div className="mt-2 text-black text-lg" style={{ fontFamily: 'Playwrite AT, cursive' }}>{unitLabels[unit]}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className='mt-10 flex justify-center'>
                <h2 className="text-3xl font-extrabold mb-4 text-gray-800" style={{ fontFamily: 'Great Vibes, cursive' }}>Para Nuestra Boda</h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Countdown;