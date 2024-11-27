import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "../calendar/calendar";
import Calendar from "../calendar/calendar";

const Home = ({ user, onLogout }) => {
  return (
    <div className="home-container">
      <header className="navbar">
        <div className="navbar-title">Caballo Blanco</div>
        <div className="navbar-actions">
          {user ? (
            <>
              <span className="welcome-message">Hola, {user.name}</span>
              {user.role === "admin" && (
                <Link to="/admin-dashboard" className="admin-dashboard-link">
                  Admin Dashboard
                </Link>
              )}
              <button onClick={onLogout} className="logout-button">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-button">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="register-button">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="home-content">
        <h1>Bienvenido a Caballo Blanco</h1>
        <p>¡Disfruta de una experiencia gastronómica única!</p>
        <div>
          <Calendar/>
        </div>
      </main>
    </div>
  );
};

export default Home;
