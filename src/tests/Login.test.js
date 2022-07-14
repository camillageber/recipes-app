import React from 'react';
import Login from '../pages/Login';
import { render } from '@testing-library/react';

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
  });
