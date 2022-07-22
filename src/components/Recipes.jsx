import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import foodContext from '../context/FoodContext';
import useResultAPIs from '../services/combinerAPIs';
import Card from './Card';
import Category from './Category';

function Recipes() {
  const { searchBar, filterCategory } = useContext(foodContext);

  const [resultSearchBar, setResultSearchBar] = useState([]);

  const mount = useRef();

  const history = useHistory();
  const { location: { pathname } } = history;

  const { getByName, getBy, getByCategory } = useResultAPIs(pathname.replace('/', ''));

  useEffect(() => {
    (async () => {
      const result = await getByName('');
      setResultSearchBar(result);
    })();
  }, [getByName]);

  useEffect(() => {
    if ((searchBar.input.length) > 1 && searchBar.radio === 'f') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      (async () => {
        const result = await getBy(searchBar.input, searchBar.radio);
        setResultSearchBar(result);
        if (result.length === 1) {
          history.push(`${pathname}/${result[0].idrecipe}`);
        }
      })();
    }
  }, [getBy, history, pathname, searchBar]);

  useEffect(() => {
    if (!mount.current) {
      mount.current = true;
    } else {
      (async () => {
        const result = filterCategory
          ? await getByCategory(filterCategory)
          : await getByName('');
        setResultSearchBar(result);
      })();
    }
  }, [filterCategory, getByCategory, mount]);
  return (
    <>
      {resultSearchBar.length > 0
      && <Category pathname={ pathname.replace('/', '') } />}
      <div className="container-cards">
        {resultSearchBar.slice(0, +('12')).map((recipie, index) => (
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

export default Recipes;
