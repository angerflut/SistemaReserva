// src/components/MapView.js
import React, { useEffect, useState } from 'react';
import './styles.css';

const MapView = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const savedTables = [];
        for (let i = 1; i <= 3; i++) {
            const position = JSON.parse(localStorage.getItem(`table-${i}`));
            if (position) {
                savedTables.push({ id: i, x: position.x, y: position.y });
            }
        }
        setTables(savedTables);
    }, []);

    return (
        <div id="map-container">
            <img id="map-image" src="/map.jpg" alt="Mapa del Restaurante" />
            {tables.map(table => (
                <div
                    key={table.id}
                    className="table"
                    style={{ left: `${table.x}px`, top: `${table.y}px` }}
                >
                    {table.id}
                </div>
            ))}
        </div>
    );
};

export default MapView;
