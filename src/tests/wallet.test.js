import React from "react";
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';

describe('testa a pagina Wallet "/carteira"', () => {
    it('testa se na rota "/carteira" existem todos os inputs esperados', () => {
      renderWithRouterAndRedux(<Wallet />)

      const inputCurrency = screen.getByTestId('currency-input');
      expect(inputCurrency).toBeInTheDocument();

      const inputValue = screen.getByTestId('value-input');
      expect(inputValue).toBeInTheDocument();

      const inputTag = screen.getByTestId('tag-input');
      expect(inputTag).toBeInTheDocument();

      const inputMethod = screen.getByTestId('method-input');
      expect(inputMethod).toBeInTheDocument();

      const inputDescription = screen.getByTestId('description-input');
      expect(inputDescription).toBeInTheDocument();  

      const button = screen.getByText('Adicionar despesa')
      expect(button).toBeInTheDocument();
    });
});
