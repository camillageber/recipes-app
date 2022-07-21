import { screen, waitFor } from '@testing-library/react';

import { resultByName } from './mocks/searchByName';
import renderWithRouter from './renderWithRouter';
import App from '../App';

beforeEach( () => jest.spyOn(global, 'fetch').mockResolvedValue({
  json: jest.fn().mockResolvedValue({
    resultByName,
  })
}) );

describe('Testando o componente Recipes', () => {
  jest.setTimeout(7000)
  it('Resposta da API', async () => {
    renderWithRouter(<App />, '/foods')
    await expect(global.fetch).toHaveBeenCalled();
  })
})