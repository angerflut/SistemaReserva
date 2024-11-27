// src/components/MapEditor.js
import React, { useState, useEffect } from 'react';
import './styles.css';

const MapEditor = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        // Cargar coordenadas desde localStorage al iniciar
        const savedTables = [];
        for (let i = 1; i <= 3; i++) {
            const position = JSON.parse(localStorage.getItem(`table-${i}`));
            if (position) {
                savedTables.push({ id: i, x: position.x, y: position.y });
            }
        }
        setTables(savedTables);
    }, []);

    const handleDrag = (e, id) => {
        const newX = e.clientX - e.target.offsetWidth / 2;
        const newY = e.clientY - e.target.offsetHeight / 2;

        setTables(prev =>
            prev.map(table => (table.id === id ? { ...table, x: newX, y: newY } : table))
        );

        // Guardar la posición en localStorage
        localStorage.setItem(`table-${id}`, JSON.stringify({ x: newX, y: newY }));
    };

    return (
        <div id="map-container">
            <img id="map-image" src="/map.jpg" alt="Mapa del Restaurante" />
            {tables.map(table => (
                <div
                    key={table.id}
                    className="table"
                    style={{ left: `${table.x}px`, top: `${table.y}px` }}
                    draggable
                    onDragEnd={e => handleDrag(e, table.id)}
                >
                    {table.id}
                </div>
            ))}
        </div>
    );
};

export default MapEditor;
