import React, { useState, useEffect } from 'react';
import './AnnonceUser.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const AnnonceUser = () => {

  useEffect(() => {
    // Store the current page in localStorage when the route changes
    localStorage.setItem('lien', '/AnnonceUser');
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(3);

  const staticData = [
    {
      idannonce: 1,
      voiture: {
        images: ['image1.jpg'],
        modele: {
          marque: { nom: 'Marque1' },
          nom: 'Modèle2',
          categorie: { nom: 'Catégorie1' },
        },
        anneesortie: 2020,
        commission: 100000,
      },
    },
    {
      idannonce: 2,
      voiture: {
        images: ['image1.jpg'],
        modele: {
          marque: { nom: 'Marque1' },
          nom: 'Modèle3',
          categorie: { nom: 'Catégorie1' },
        },
        anneesortie: 2020,
        commission: 100000,
      },
    },
    {
      idannonce: 3,
      voiture: {
        images: ['image1.jpg'],
        modele: {
          marque: { nom: 'Marque1' },
          nom: 'Modèle4',
          categorie: { nom: 'Catégorie1' },
        },
        anneesortie: 2020,
        commission: 100000,
      },
    },
    {
      idannonce: 4,
      voiture: {
        images: ['image1.jpg'],
        modele: {
          marque: { nom: 'Marque1' },
          nom: 'Modèle5',
          categorie: { nom: 'Catégorie1' },
        },
        anneesortie: 2020,
        commission: 100000,
      },
    },
    {
      idannonce: 5,
      voiture: {
        images: ['image1.jpg'],
        modele: {
          marque: { nom: 'Marque1' },
          nom: 'Modèle6',
          categorie: { nom: 'Catégorie1' },
        },
        anneesortie: 2020,
        commission: 100000,
      },
    },
    {
      idannonce: 6,
      voiture: {
        images: ['image1.jpg'],
        modele: {
          marque: { nom: 'Marque1' },
          nom: 'Modèle7',
          categorie: { nom: 'Catégorie1' },
        },
        anneesortie: 2020,
        commission: 100000,
      },
    },
    // Add more data if necessary
  ];

  const [featuredCars] = useState(staticData);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = featuredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(featuredCars.length / carsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
        <div className="featured-cars-container">
          <div className="featured-cars-intro">
            <h2>Discover Our Featured Cars</h2>
            <p>Explore our selection of premium cars handpicked for you.</p>
          </div>
          <div className="car-list-featured-cars">
            {currentCars.map((car) => (
              <div className="car-featured-cars" key={car.idannonce}>
                <img src={car.voiture.images[0]} alt={car.voiture.modele.nom} />
                <div className="car-details-featured-cars">
                  <h3>{car.voiture.modele.marque.nom} {car.voiture.modele.nom}</h3>
                  <p>{car.voiture.modele.categorie.nom}</p>
                  <p>Year: {car.voiture.anneesortie}</p>
                  <p>Price: {car.voiture.commission} Ar</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination-featured-cars">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active-featured-cars' : ''}
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

export default AnnonceUser;
