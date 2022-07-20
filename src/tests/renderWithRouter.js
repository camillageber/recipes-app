import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FoodProvider from '../context/FoodProvider';

const renderWithRouter = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <FoodProvider>
        <Router history={ history }>
          {component}
        </Router>
      </FoodProvider>,
    ),
    history,
  };
};

export default renderWithRouter;
