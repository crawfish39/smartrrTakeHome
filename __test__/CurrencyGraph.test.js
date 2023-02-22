import React, {forwardRef} from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import CurrencyGraph from "../client/components/CurrencyGraph.js";
import UserForm from '../client/components/UserForm.js';

jest.mock('react-chartjs-2', () => (
  { 
    Line: () => null 
  }))

jest.mock('../client/components/UserForm.js');

describe('CurrencyGraph', () => {
  
  describe('should render the CurrencyGraph', () => {
    let graph;
    const props = {
      historicalData:[],
      userInput: 1,
    }
    
    beforeAll(() => {
      graph = render(<CurrencyGraph {...props}/>);
      
    })

    it('should render CurrencyGraph component', () => {
      expect(screen.getByText('BRL to USD Exchange Rate Over Time')).toBeInTheDocument();
    })

    it('should render line chart canvas', () => {
      expect(screen.queryByTitle('line-chart')).toBeDefined()
    })

    it('UserForm mock should have been called', () => {
      expect(UserForm).toHaveBeenCalled()
    })    
  })
})