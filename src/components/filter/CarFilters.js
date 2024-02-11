// CarFilters.js
import React, { useState, useEffect } from 'react';
import './CarFilters.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const CarFilters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(3);
  const [filters, setFilters] = useState({ brand: '', category: '', price: 0, mileage: 0 }); // Initial filters state

  useEffect(() => {
    // Store the current page in localStorage when the route changes
    localStorage.setItem('lien', '/CarFilters');
    console.log("lien ici :"+localStorage.getItem('lien'));
  }, []);

  const staticData = [
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
        kilometrage: 50000,
      },
    },
    // Add more data as needed
  ];

  const [featuredCars] = useState(staticData);

  // Apply filters to cars
  const filteredCars = featuredCars.filter((car) => {
    return (
      (filters.brand === '' || car.voiture.modele.marque.nom === filters.brand) &&
      (filters.category === '' || car.voiture.modele.categorie.nom === filters.category) &&
      (filters.price === 0 || car.voiture.commission <= filters.price) &&
      (filters.mileage === 0 || car.voiture.kilometrage <= filters.mileage)
    );
  });

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1); // Reset pagination when filter changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFavoriteToggle = (idannonce) => {
    // Logique pour gérer l'ajout/suppression de l'annonce aux favoris
    console.log(`Toggle favorite for car with ID: ${idannonce}`);
  };

  return (
    <>
      <Navbar />
      <div className="car-filters-container">
        <div className="filters">
          <select name="brand" value={filters.brand} onChange={handleFilterChange}>
            <option value="">Select Brand</option>
            <option value="Marque1">Marque1</option>
            {/* Add more brand options */}
          </select>
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">Select Category</option>
            <option value="Catégorie1">Catégorie1</option>
            {/* Add more category options */}
          </select>
          <div className="price-filter">
            <p>Price: {filters.price}</p>
            <input
              type="range"
              min="0"
              max="100000"
              value={filters.price}
              onChange={(e) => handleFilterChange({ target: { name: 'price', value: parseInt(e.target.value) } })}
              className="slider"
            />
          </div>
          <div className="mileage-filter">
            <p>Mileage: {filters.mileage}</p>
            <input
              type="range"
              min="0"
              max="100000"
              value={filters.mileage}
              onChange={(e) => handleFilterChange({ target: { name: 'mileage', value: parseInt(e.target.value) } })}
              className="slider"
            />
          </div>
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
                <p>Mileage: {car.voiture.kilometrage}</p>
                <div className="heart-container" title="Add to Favorites">
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={`favorite-${car.idannonce}`}
                    onChange={() => handleFavoriteToggle(car.idannonce)}
                  />
                  <div className="svg-container">
                    <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
                    </svg>
                    <svg className="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="10,10 20,20" />
                      <polygon points="10,50 20,50" />
                      <polygon points="20,80 30,70" />
                      <polygon points="90,10 80,20" />
                      <polygon points="90,50 80,50" />
                      <polygon points="80,80 70,70" />
                    </svg>
                  </div>
                </div>
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

export default CarFilters;
