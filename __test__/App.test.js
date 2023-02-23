import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../client/App';
import CurrencyGraph from "../client/components/CurrencyGraph";
import CurrencyTable from '../client/components/CurrencyTable';

jest.mock('../client/components/CurrencyGraph');
jest.mock('../client/components/CurrencyTable');

describe('App', () => {
  
  describe('should render the app', () => {
    let app;

    beforeAll(() => {
      app = render(<App/>);
    })
    
    it('CurrencyGraph mock should have been called', () => {
      expect(CurrencyGraph).toHaveBeenCalled()
    })

    it('CurrencyTable mock should been called', () => {
      expect(CurrencyTable).toHaveBeenCalled()
    })
  })
})