import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import './foods.css';

import Recipes from '../components/Recipes';

export default function Foods() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

  return (
    <>
      <Header
        pageTitle={ capitalize(pathname.replace('/', '')) }
        color={ pathname.replace('/', '') === 'foods' ? 'red' : 'green' }
      />
      <Recipes />
      <Footer />
    </>
  );
}
