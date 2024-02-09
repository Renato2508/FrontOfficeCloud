// Navbar.js
import React from 'react';
import './Navbar.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleListAnnonce = (e) => {
    e.preventDefault();
    navigate('/HomePage', { state: { type: 1 } });
  };

  const handleMessagerie = (e) => {
    e.preventDefault();
    navigate('/HomePage', { state: { type: 2 } });
  };

  const handleFiltre = (e) => {
    e.preventDefault();
    navigate('/HomePage', { state: { type: 3 } });
  };

  const handleAnnonceFavoris = (e) => {
    e.preventDefault();
    navigate('/HomePage', { state: { type: 4 } });
  };

  const handleDeconnexion = (e) => {
    e.preventDefault();
    localStorage.setItem("auth",false);
    navigate('/HomePage', { state: { type: 1 } });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2>Logo</h2>
        <ul>
          <li onClick={handleListAnnonce}><p>List Annonce</p></li>
          <li onClick={handleMessagerie}><p>Messagerie</p></li>
          <li onClick={handleFiltre}><p>Filtre Annonce</p></li>
          <li onClick={handleAnnonceFavoris}><p>Annonces Favorites</p></li>
          <li onClick={handleDeconnexion}><p>Deconnexion</p></li>
          {/* Add more navbar elements if necessary */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
