import React, { useState } from 'react';
import './Calendar.css'; // Importa el archivo CSS

// Función que obtiene el primer día del mes (0 = domingo, 6 = sábado)
const getFirstDayOfMonth = (year, month) => {
  const date = new Date(year, month, 1);
  return date.getDay();
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Función para obtener los días del mes y dividirlos en semanas
  const generateDaysOfMonth = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = getFirstDayOfMonth(year, month);
    const lastDay = new Date(year, month + 1, 0).getDay();
    const days = [];

    // Agregar días vacíos antes del primer día del mes
    for (let i = 0; i < firstDay; i++) {
      days.push(null); // Día vacío
    }

    // Agregar los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Agregar días vacíos después del último día del mes
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        days.push(null); // Día vacío
      }
    }

    // Dividir los días en semanas de 7 días
    const weeks = [];
    while (days.length > 0) {
      weeks.push(days.splice(0, 7)); // Cortamos los primeros 7 días
    }

    return weeks;
  };

  // Funciones para navegar entre meses
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleDayClick = (day) => {
    if (day) {
      alert(`Seleccionaste el día: ${day}`);
    }
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const weeks = generateDaysOfMonth(currentYear, currentMonth);

  return (
    <div>
      <div className="calendar-header">
        {/* Botón para ir al mes anterior */}
        <button onClick={goToPreviousMonth}>&lt;</button>
        {/* Mostrar el mes y el año */}
        <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentYear}</span>
        {/* Botón para ir al siguiente mes */}
        <button onClick={goToNextMonth}>&gt;</button>
      </div>

      <div className="calendar">
        <div className="days-of-week">
          <span>Dom</span>
          <span>Lun</span>
          <span>Mar</span>
          <span>Mié</span>
          <span>Jue</span>
          <span>Vie</span>
          <span>Sáb</span>
        </div>
        <div className="weeks">
          {weeks.map((week, index) => (
            <div key={index} className="week">
              {week.map((day, dayIndex) => (
                <div key={dayIndex}
                onClick={() => handleDayClick(day)}
                className={`day ${day ? '' : 'empty'}`}>
                  {day ? day : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
