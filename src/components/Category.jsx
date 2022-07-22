import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import foodContext from '../context/FoodContext';
import useResultAPIs from '../services/combinerAPIs';

export default function Category({ pathname }) {
  const { toggleFilterCategory } = useContext(foodContext);
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
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => toggleFilterCategory('') }
      >
        All
      </button>
      { filtro
        .map((element, inx) => (
          <button
            type="button"
            data-testid={ `${element.strCategory}-category-filter` }
            key={ inx }
            onClick={ () => toggleFilterCategory(element.strCategory) }
          >
            { element.strCategory }
          </button>)) }
    </div>
  );
}

Category.propTypes = {
  pathname: PropTypes.string.isRequired,
};
