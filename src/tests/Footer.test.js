import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa footer', () => {
  test('testa button meals', () => {
    const {history} = renderWithRouter(<App />, '/drinks');
    const butonMeals = screen.getByTestId('food-bottom-btn');
    expect(butonMeals).toBeInTheDocument();
    userEvent.click(butonMeals);
    const {location: {pathname}} = history;
    history.push('/foods');
  });
  test('testa button drinks', () => {
    const {history} = renderWithRouter(<App />, '/foods');
    const butonDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(butonDrinks).toBeInTheDocument();
    userEvent.click(butonDrinks);
    const {location: {pathname}} = history;
    history.push('/drinks');
  });
});
