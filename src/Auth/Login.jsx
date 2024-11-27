import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users"; // Usuarios predefinidos

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Buscar el usuario en el arreglo
    const user = users.find(
      (u) => u.username === email && u.password === password
    );

    if (user) {
      // Actualizar el estado global del usuario
      onLogin(user);

      // Redirigir a Home después del inicio de sesión
      navigate("/");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
