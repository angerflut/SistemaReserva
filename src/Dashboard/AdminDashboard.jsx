import React, { useState } from 'react';
import Draggable from 'react-draggable'; // Importar la librería
import tablesData from '../data/tables'; // Datos simulados de mesas
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [tables, setTables] = useState(tablesData);
  const [editTable, setEditTable] = useState(null);
  const [newCapacity, setNewCapacity] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const handleEdit = (table) => {
    setEditTable(table);
    setNewCapacity(table.capacity);
    setNewStatus(table.status);
  };

  const handleSave = () => {
    setTables(
      tables.map((table) =>
        table.id === editTable.id
          ? { ...table, capacity: newCapacity, status: newStatus }
          : table
      )
    );
    setEditTable(null);
    setNewCapacity('');
    setNewStatus('');
  };

  const handleDrag = (e, position, tableId) => {
    const { x, y } = position;
    setTables(
      tables.map((table) =>
        table.id === tableId
          ? { ...table, mapPosition: { left: `${x}px`, top: `${y}px` } }
          : table
      )
    );
  };

  // Agregar una nueva mesa
  const handleAddTable = () => {
    const newTable = {
      id: Date.now(), // Generar un ID único basado en el tiempo
      number: tables.length + 1,
      capacity: 4,
      status: 'available',
      mapPosition: { left: '0px', top: '0px' },
    };
    setTables([...tables, newTable]);
  };

  // Eliminar una mesa
  const handleDeleteTable = (tableId) => {
    setTables(tables.filter((table) => table.id !== tableId));
  };

  return (
    <div className="admin-dashboard">
      {/* Espacio izquierdo para el mapa */}
      <div className="left-space">
        <h2>Mapa del Restaurante</h2>
        <div className="restaurant-map">
          {tables.map((table) => (
            <Draggable
              key={table.id}
              defaultPosition={{
                x: parseInt(table.mapPosition.left),
                y: parseInt(table.mapPosition.top),
              }}
              onStop={(e, data) => handleDrag(e, data, table.id)}
            >
              <div
                className={`map-table ${table.status}`}
                onClick={() => handleEdit(table)}
              >
                Mesa {table.number}
              </div>
            </Draggable>
          ))}
        </div>
        {editTable && (
          <div className="edit-form">
            <h3>Editar Mesa {editTable.number}</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div>
                <label htmlFor="capacity">Capacidad: </label>
                <input
                  type="number"
                  id="capacity"
                  value={newCapacity}
                  onChange={(e) => setNewCapacity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="status">Estado: </label>
                <select
                  id="status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  required
                >
                  <option value="available">Disponible</option>
                  <option value="reserved">Reservada</option>
                </select>
              </div>
              <button type="submit">Guardar cambios</button>
              <button type="button" onClick={() => setEditTable(null)}>
                Cancelar
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Lista de mesas */}
      <div className="table-list">
        <h1>Panel de Administración - Mesas</h1>
        <button className="add-button" onClick={handleAddTable}>
          Agregar Mesa
        </button>
        {tables.map((table) => (
          <div key={table.id} className="table-item">
            <p>
              <strong>Mesa {table.number}</strong>
            </p>
            <p>Capacidad: {table.capacity} personas</p>
            <p>Estado: {table.status}</p>
            <button onClick={() => handleEdit(table)}>Editar</button>
            <button onClick={() => handleDeleteTable(table.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
