import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Auth/Login";
import AdminDashboard from "./Dashboard/AdminDashboard";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home user={currentUser} onLogout={handleLogout} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/admin-dashboard"
          element={
            currentUser?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <div>No autorizado</div>
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
