import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './FeaturedCars.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const FeaturedCars = () => {
  // const navigate = useNavigate();
  const [data,setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(3);

  useEffect(() => {
    // Store the current page in localStorage when the route changes
    localStorage.setItem('lien', '/FeaturedCars');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cloud-back-voiture-production-3dbf.up.railway.app/annonce/valides`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log('Successful:', data);
          setData(data.object);
        } else {
          console.log('Failed one:', data);
          console.error('Failed two:', response.status, response.statusText);
          // Handle login failure
        }
      } catch (error) {
        console.error('Error during calling:', error.message);
        // Handle other errors
      }
    };
  
    const initializeData = () => {
      fetchData();
    };
  
    initializeData();
  }, []);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = data.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(data.length / carsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFavoriteToggle = (idannonce) => {
    // Logic for handling favorite toggle
    console.log(`Toggle favorite for car with ID: ${idannonce}`);
  };

  const handleNavigateToMessagePage = (id) => {
    if (localStorage.getItem('authToken') !== "true") {
        console.log("Navigating to MessagesPage");
        // navigate('/MessagesPage', { state: { id_auteur: id } });
        <Navigate to='/MessagesPage' />
    } else {
        console.log("Navigating to Login");
        // navigate('/Login');
      <Navigate to='/Login' />
    }
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
            <img src={"data:image;base64,"+car.voiture.images[0]} alt={car.voiture.modele.nom} />
            <div className="car-details-featured-cars">
              <h3>{car.voiture.modele.marque.nom} {car.voiture.modele.nom}</h3>
              <p>{car.voiture.modele.categorie.nom}</p>
              <p>Year: {car.voiture.anneesortie}</p>
              <p>Price: {car.voiture.commission} Ar</p>
            </div>
            <div className="button-container">
              <button className="details-button">Details</button>
              <button className="message-button" onClick={() =>handleNavigateToMessagePage(car.user.iduser)}>Message</button>
            </div>
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

export default FeaturedCars;
