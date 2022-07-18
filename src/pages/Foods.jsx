import React, { useContext, useEffect, useState } from 'react';
import { getFoodBy } from '../services/foodAPI';
import Header from '../components/Header';
import foodContext from '../context/FoodContext';

export default function Foods() {
  const { searchBar } = useContext(foodContext);
  const [resultSearchBar, setResultSearchBar] = useState([]);

  console.log(resultSearchBar);

  useEffect(() => {
    if ((searchBar.input.length) > 1 && searchBar.radio === 'f') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      (async () => {
        setResultSearchBar(await getFoodBy(searchBar.input, searchBar.radio));
      })();
    }
  }, [searchBar]);
  return (
    <>
      <Header pageTitle="Foods" />
      <h1>Foods</h1>
    </>
  );
}
