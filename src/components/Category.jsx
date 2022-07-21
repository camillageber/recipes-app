import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import { getAllCategoriesAreaIngredients } from '../services/foodAPI';
// import { getAllCategoriesAlcoholicGlassesIngredients } from '../services/drinkAPI';
import useResultAPIs from '../services/combinerAPIs';

export default function Category({ pathname }) {
  const [result, setResult] = useState([]);

  const { getAllCategories } = useResultAPIs(pathname);

  useEffect(() => {
    const api = async () => {
      let response = [];
      response = await getAllCategories();
      return setResult(response);
    };
    api();
  }, [getAllCategories]);

  const NUMBER = 5;
  const filtro = result?.slice(0, NUMBER);

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
