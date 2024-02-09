// HomePage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import FeaturedCars from '../../components/featured_car/FeaturedCars';
import MessagesPage from '../../components/messages_page/MessagesPage';
import CarFilters from '../../components/filter/CarFilters';
import FavoriteCars from '../../components/favorite_cars/FavoriteCars';

const HomePage = () => {
  const location = useLocation();
  const type = location?.state?.type;

  return (
    <div>
      <div>
        {type === 1 ? <FeaturedCars /> 
        :type === 2 ? <MessagesPage />
        :type === 3 ? <CarFilters />
        :type === 4 ? <FavoriteCars />
        : null}
      </div>
    </div>
  );
};

export default HomePage;
