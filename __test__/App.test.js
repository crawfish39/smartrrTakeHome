import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../client/App.js';
import CurrencyGraph from "../client/components/CurrencyGraph.js";
import CurrencyTable from '../client/components/CurrencyTable.js';

jest.mock('../client/components/CurrencyGraph.js');
jest.mock('../client/components/CurrencyTable.js');

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