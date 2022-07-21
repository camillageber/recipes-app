import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import './foods.css';

import Recipes from '../components/Recipes';
import foodContext from '../context/FoodContext';

export default function Foods() {
  const { setTypeResult } = useContext(foodContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

  useEffect(() => {
    setTypeResult('foods');
  }, []);

  return (
    <>
      <Header pageTitle={ capitalize(pathname.replace('/', '')) } />
      <Recipes />
      <Footer />
    </>
  );
}
