import React from 'react';
import Login from '../pages/Login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a tela de Login', () => {
  test('testa os inputs e o botão', () => {
    // acessar os elementos da tela
    render(<Login />);
    const inputEmail = screen.getByTestId("email-input");
    const inputPassword = screen.getByTestId("password-input");
    const buttonEnter = screen.getByTestId("login-submit-btn");
    // interagir com os elementos (se for necessário)
    // fazer os testes
    expect(inputPassword).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
    });

  test('testa se o button esta habilitado', () => {
    // console.log(renderWithRouter);
    renderWithRouter(<App />)
    // acessar os elementos da tela
    const email = 'ogabriel@gmail.com';
    // interagir com os elementos (se for necessário)
    userEvent.type(screen.getByTestId("email-input"), email);
    userEvent.type(screen.getByTestId("password-input"), '1234567');
    userEvent.click(screen.getByTestId("login-submit-btn"));
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    // console.log(localStorageUser);
    // fazer os testes
    expect(localStorageUser.email).toBe(email);
  });
});
