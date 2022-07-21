import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import foodContext from '../context/FoodContext';
import useResultAPIs from '../services/combinerAPIs';
import Card from './Card';

function Recipes() {
  const { searchBar, typeResult } = useContext(foodContext);
  const [resultSearchBar, setResultSearchBar] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;
  const { getByName, getBy } = useResultAPIs(pathname.replace('/', ''));

  useEffect(() => {
    (async () => {
      const result = await getByName('');
      setResultSearchBar(result.slice(0, +('12')));
    })();
  }, [getByName]);

  useEffect(() => {
    if ((searchBar.input.length) > 1 && searchBar.radio === 'f') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      (async () => {
        const result = await getBy(searchBar.input, searchBar.radio);
        setResultSearchBar(result?.slice(0, +('12')));
      })();
    }
  }, [searchBar, getBy, typeResult]);

  console.log(resultSearchBar);

  if (resultSearchBar.length === 1) {
    history.push(`${pathname}/${resultSearchBar[0].idrecipe}`);
  }
  return (
    <div className="container-cards">
      {resultSearchBar.map((recipie, index) => (
        <Card
          { ...recipie }
          key={ recipie.idrecipe }
          index={ index }
        />
      ))}
    </div>
  );
}

export default Recipes;
