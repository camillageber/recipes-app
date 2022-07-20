import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o SearchBar', () => {
  test('verifica os radio', () => {
    renderWithRouter(<App />, '/foods');
    const buttonSearch = screen.getByTestId('search-top-btn')
    userEvent.click(buttonSearch);

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
    renderWithRouter(<App />, '/foods');
    const buttonSearch = screen.getByTestId('search-top-btn')
    userEvent.click(buttonSearch);

    const inputState = 'lalaland'
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    userEvent.type(screen.getByTestId('search-input'), 'lalaland');
    expect(input.value).toBe(inputState);

    const buttonSearch2 = screen.getByTestId('exec-search-btn');
    userEvent.click(buttonSearch2);
  });
});
