import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div>
      <h1>Bienvenido, {currentUser.email}</h1>
      {currentUser.role === "admin" ? (
        <>
          <button onClick={() => navigate("/map-edit")}>Modificar Mapa</button>
          <button onClick={() => navigate("/map-view")}>Ver Mapa</button>
        </>
      ) : (
        <button onClick={() => navigate("/map-view")}>Ver Mapa</button>
      )}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
