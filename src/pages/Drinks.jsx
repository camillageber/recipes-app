import React, { useContext, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import './foods.css';

import Recipes from '../components/Recipes';
import foodContext from '../context/FoodContext';

export default function Foods() {
  const { setTypeResult } = useContext(foodContext);

  useEffect(() => {
    setTypeResult('drinks');
  });

  return (
    <>
      <Header pageTitle="Drinks" color="green" />
      <Recipes />
      <Footer />
    </>
  );
}
