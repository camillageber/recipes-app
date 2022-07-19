import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getFoodBy, searchFirstLetter } from '../services/foodAPI';
import Header from '../components/Header';
import foodContext from '../context/FoodContext';
import './foods.css';
import Card from '../components/Card';

export default function Foods() {
  const { searchBar, typeResult } = useContext(foodContext);
  const [resultSearchBar, setResultSearchBar] = useState([]);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const result = await searchFirstLetter('c');
      setResultSearchBar(result.slice(0, +('12')));
    })();
  }, []);

  useEffect(() => {
    if ((searchBar.input.length) > 1 && searchBar.radio === 'f') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      (async () => {
        setResultSearchBar(await getFoodBy(searchBar.input, searchBar.radio));
      })();
    }
  }, [searchBar]);

  if (resultSearchBar.length === 1) {
    history.push(`/${typeResult}/${resultSearchBar[0].idMeal}`);
  }
  return (
    <>
      <Header pageTitle="Foods" />
      <h1>Foods</h1>
      <div className="container-cards">
        {resultSearchBar.map((recipie, index) => (
          <Card
            { ...recipie }
            key={ recipie.idMeal }
            index={ index }
          />
        ))}
      </div>
    </>
  );
}
