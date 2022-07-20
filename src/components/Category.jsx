import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getAllCategoriesAreaIngredients } from '../services/foodAPI';
import { getAllCategoriesAlcoholicGlassesIngredients } from '../services/drinkAPI';

export default function Category({ pathname }) {
  const [result, setResult] = useState('');

  const api = async () => {
    let response = [];
    if (pathname === 'Foods') {
      response = await getAllCategoriesAreaIngredients();
      return setResult(response);
    }
    if (pathname === 'Drinks') {
      response = await getAllCategoriesAlcoholicGlassesIngredients();
      return setResult(response);
    }
  };

  useEffect(() => {
    api();
  }, []);

  const { categoriesList, CategoriesList } = result;
  const NUMBER = 4;
  const category = pathname === 'Foods' ? CategoriesList : categoriesList;
  const arr = category === undefined ? [] : category;
  const filtro = arr.filter((element, inx) => inx <= NUMBER && element);

  return (
    <div>
      { filtro
        .map((element, inx) => (
          <button
            type="button"
            data-testid={ `${element.strCategory}-category-filter` }
            key={ inx }
          >
            { element.strCategory }
          </button>)) }
    </div>
  );
}

Category.propTypes = {
  pathname: PropTypes.string.isRequired,
};
