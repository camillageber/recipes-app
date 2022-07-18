import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';

describe('Testa footer', () => {
  test('testa button meals', () => {
    const {history} = renderWithRouter(<Footer />);
    const butonMeals = screen.getByTestId('food-bottom-btn');
    expect(butonMeals).toBeInTheDocument();
    userEvent.click(butonMeals);
    const {location: {pathname}} = history;
    history.push('/foods');
  });
  test('testa button drinks', () => {
    const {history} = renderWithRouter(<Footer />);
    const butonDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(butonDrinks).toBeInTheDocument();
    userEvent.click(butonDrinks);
    const {location: {pathname}} = history;
    history.push('/foods');
  });
});
