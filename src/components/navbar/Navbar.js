// Navbar.js
import React from 'react';
import './Navbar.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleListAnnonce = (e) => {
    e.preventDefault();
    navigate('/FeaturedCars');
  };

  const handleMessagerie = (e) => {
    e.preventDefault();
    if (localStorage.getItem('authToken') !== null) {
      console.log("Navigating to MessagesPage");
      navigate('/MessagesPage');
    } else {
        console.log("Navigating to Login");
        navigate('/Login');
    }
  };

  const handleFiltre = (e) => {
    e.preventDefault();
    navigate('/CarFilters');
  };

  const handleAnnonceFavoris = (e) => {
    e.preventDefault();
    navigate('/FavoriteCars');
  };

  const handleLogin= (e) => {
    e.preventDefault();
    navigate('/Login');
  };


  const handleDeconnexion = (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken');
    navigate('/FeaturedCars');
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
          <li onClick={handleLogin}><p>Login</p></li>
          <li onClick={handleDeconnexion}><p>Deconnexion</p></li>
          {/* Add more navbar elements if necessary */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
