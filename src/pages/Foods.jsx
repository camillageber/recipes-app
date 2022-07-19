import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import foodContext from '../context/FoodContext';
import './foods.css';
import Card from '../components/Card';
import useResultAPIs from '../services/combinerAPIs';

export default function Foods() {
  const { searchBar } = useContext(foodContext);
  const [resultSearchBar, setResultSearchBar] = useState([]);
  const { getByFirstLetter, getBy } = useResultAPIs('foods');

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const result = await getByFirstLetter('c');
      setResultSearchBar(result.slice(0, +('12')));
    })();
  }, []);

  useEffect(() => {
    if ((searchBar.input.length) > 1 && searchBar.radio === 'f') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      (async () => {
        setResultSearchBar(await getBy(searchBar.input, searchBar.radio));
      })();
    }
  }, [searchBar]);

  if (resultSearchBar.length === 1) {
    history.push(`/foods/${resultSearchBar[0].idrecipe}`);
  }
  return (
    <>
      <Header pageTitle="Foods" />
      <h1>Foods</h1>
      <div className="container-cards">
        {resultSearchBar.map((recipie, index) => (
          <Card
            { ...recipie }
            key={ recipie.idrecipe }
            index={ index }
          />
        ))}
      </div>
    </>
  );
}
