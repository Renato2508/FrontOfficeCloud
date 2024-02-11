// FavoriteCars.js
import React, { useState, useEffect } from 'react';
import './FavoriteCars.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const FavoriteCars = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(3);

  useEffect(() => {
    // Store the current page in localStorage when the route changes
    localStorage.setItem('lien', '/FavoriteCars');
    console.log("lien ici :"+localStorage.getItem('lien'));
  }, []);

  // Sample data for favorite cars
  const favoriteCarsData = [
    {
      idannonce: 1,
      voiture: {
        images: ['image1.jpg'],
        modele: {
          marque: { nom: 'Marque1' },
          nom: 'Modèle1',
          categorie: { nom: 'Catégorie1' },
        },
        anneesortie: 2020,
        commission: 100000,
      },
    },
    // Add more favorite cars data as needed
  ];

  const [favoriteCars] = useState(favoriteCarsData);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = favoriteCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(favoriteCars.length / carsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <Navbar />
    <div className="favorite-cars-container">
      <div className="favorite-cars-intro">
        <h2>Your Favorite Cars</h2>
        <p>Explore your favorite cars here.</p>
      </div>
      <div className="car-list-favorite-cars">
        {currentCars.map((car) => (
          <div className="car-favorite-cars" key={car.idannonce}>
            <img src={car.voiture.images[0]} alt={car.voiture.modele.nom} />
            <div className="car-details-favorite-cars">
              <h3>{car.voiture.modele.marque.nom} {car.voiture.modele.nom}</h3>
              <p>{car.voiture.modele.categorie.nom}</p>
              <p>Year: {car.voiture.anneesortie}</p>
              <p>Price: {car.voiture.commission} Ar</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-favorite-cars">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active-favorite-cars' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default FavoriteCars;
