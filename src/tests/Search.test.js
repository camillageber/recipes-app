import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import FoodProvider from '../context/FoodProvider';

describe('Testando o SearchBar', () => {
  test('verifica os radio', () => {
    renderWithRouter(<FoodProvider><SearchBar /></FoodProvider>);
    const inputIngredients = screen.getByTestId('ingredient-search-radio');
    expect(inputIngredients).toBeInTheDocument();
    userEvent.click(inputIngredients);
    expect(inputIngredients).toBeChecked();

    const inputName = screen.getByTestId('name-search-radio');
    expect(inputName).toBeInTheDocument();
    userEvent.click(inputName);
    expect(inputName).toBeChecked();

    const inputFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(inputFirstLetter);
    expect(inputFirstLetter).toBeInTheDocument();
    expect(inputFirstLetter).toBeChecked();
  });
  test('testa o inputs', () => {
    renderWithRouter(<FoodProvider><SearchBar /></FoodProvider>);
    const inputState = 'lalaland'
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    userEvent.type(screen.getByTestId('search-input'), 'lalaland');
    expect(input.value).toBe(inputState);
  });
});
