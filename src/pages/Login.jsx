import React, { useContext } from 'react';
import foodContext from '../context/FoodContext';

export default function Login() {
  const context = useContext(foodContext);

  console.log(context);

  return (
    <div className="conteinerLogin">
      <form>
        <label htmlFor="email">
          <input type="text" data-testid="email-input" id="email" />
        </label>
        <label htmlFor="senha">
          <input type="password" data-testid="password-input" id="senha" />
        </label>
        <button type="submit" data-testid="login-submit-btn">
          Enter
        </button>
      </form>
    </div>
  );
}
