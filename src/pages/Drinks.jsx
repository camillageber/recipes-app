import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import foodContext from '../context/FoodContext';
import './foods.css';
import Card from '../components/Card';
import useResultAPIs from '../services/combinerAPIs';

export default function Foods() {
  const { searchBar, typeResult, setTypeResult } = useContext(foodContext);
  const [resultSearchBar, setResultSearchBar] = useState([]);
  const { getByFirstLetter, getBy } = useResultAPIs(typeResult);

  const history = useHistory();

  useEffect(() => {
    setTypeResult('drinks');
    (async () => {
      const result = await getByFirstLetter('c');
      setResultSearchBar(result.slice(0, +('12')));
    })();
  }, [typeResult]);

  useEffect(() => {
    if ((searchBar.input.length) > 1 && searchBar.radio === 'f') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      (async () => {
        setResultSearchBar(await getBy(searchBar.input, searchBar.radio));
      })();
    }
  }, [searchBar, typeResult]);

  if (resultSearchBar.length === 1) {
    history.push(`/drinks/${resultSearchBar[0].idrecipe}`);
  }
  return (
    <>
      <Header pageTitle="Drinks" color="green" />
      <h1>Drinks</h1>
      <div className="container-cards">
        {resultSearchBar.map((recipie, index) => (
          <Card
            { ...recipie }
            key={ recipie.idrecipe }
            index={ index }
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
