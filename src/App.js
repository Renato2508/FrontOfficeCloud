import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import HomePage from './containers/home_page/HomePage';
import SignupPage from './components/signup/SignupPage';
import MessagesPage from './components/messages_page/MessagesPage';
import FeaturedCars from './components/featured_car/FeaturedCars';
import CarFilters from './components/filter/CarFilters';
import FavoriteCars from './components/favorite_cars/FavoriteCars';
import AnnonceUser from './components/annonces_user/AnnonceUser';

const App = () => {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lien, setLien] = useState('/FeaturedCars');

  useEffect(() => {
    if(localStorage.getItem('lien') != null){
        setLien(localStorage.getItem('lien'));
    }
  }, []);

  useEffect(() => {
    // Check if the user is authenticated based on your logic (e.g., token presence)
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken);
  }, []);

  // Function to handle authentication
  const handleAuthentication = () => {
    // Implement your authentication logic here
    setIsAuthenticated(true);
  };

  // PrivateRoute component for securing routes
  const PrivateRoute = ({ element, path }) => {
    useEffect(() => {
      // Store the current page in localStorage when the route changes
      localStorage.setItem('currentPage', path);
    }, [path]);

    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={lien} />} /> {/* Redirection vers FeaturedCars */}
        <Route path="/Login" element={<LoginPage handleAuthentication={handleAuthentication} />} />
        {/* PrivateRoute is used for HomePage, CarDetail, and ModernForm */}
        <Route path="/HomePage" element={<PrivateRoute element={<HomePage />} path="/HomePage" />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/MessagesPage" element={<PrivateRoute element={<MessagesPage />} path="/MessagesPage" />} />
        <Route path="/FeaturedCars" element={<FeaturedCars />} /> {/* Route pour FeaturedCars */}
        <Route path="/CarFilters" element={<PrivateRoute element={<CarFilters />} path="/CarFilters" />} />
        <Route path="/FavoriteCars" element={<PrivateRoute element={<FavoriteCars />} path="/FavoriteCars" />} />
        <Route path="/AnnonceUser" element={<PrivateRoute element={<AnnonceUser />} path="/AnnonceUser" />} />
      </Routes>
    </Router>
  );
};

export default App;
