import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import foodContext from '../context/FoodContext';
import { getDrinkBy } from '../services/drinkAPI';

export default function Drinks() {
  const { searchBar } = useContext(foodContext);
  const [resultSearchBar, setResultSearchBar] = useState([]);

  console.log(resultSearchBar);

  useEffect(() => {
    if (searchBar.input.length > 1 && searchBar.radio === 'f') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      (async () => {
        setResultSearchBar(await getDrinkBy(searchBar.input, searchBar.radio));
      })();
    }
  }, [searchBar]);
  return (
    <>
      <Header pageTitle="Drinks" />
      <h1>Drinks</h1>
      <Footer />
    </>
  );
}
