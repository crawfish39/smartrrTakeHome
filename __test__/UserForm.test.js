import * as React from 'react';
import {fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserForm from '../client/components/UserForm'

describe('UserForm', () => {
  
  describe('unit tests', () => {
    let props = {
      setUserInput: jest.fn(),
      userInput: 2,
      handleSubmit: jest.fn()
    }
    
    it('should render the form', () => {
      render(<UserForm {...props}/>);
      const daysForm = screen.getByRole('form',{name: 'daysInputForm'});
      expect(daysForm).toBeInTheDocument();
    })

    it('should have an input value of 2', () => {
      render(<UserForm {...props}/>);
      const daysInput = screen.getByRole('spinbutton',{ name: /days/i });
      expect(daysInput.value).toEqual("2");
    })

    it('should submit the user input to the setUserInput function', () => {
      render(<UserForm {...props}/>);
      const daysForm = screen.getByRole('form',{name: 'daysInputForm'});
      const daysInput = screen.getByRole('spinbutton',{ name: /days/i });
      const button = screen.getByRole('button');
      fireEvent.change(daysInput,{ target: { value: 3 } });
      fireEvent.submit(button);
      expect(props.handleSubmit).toHaveBeenCalled();
      expect(props.setUserInput).toHaveBeenCalledWith(3)
    })

    it('should restore the input back to the origin userInput state after clicking submit', () => {
      render(<UserForm {...props}/>);
      const daysInput = screen.getByRole('spinbutton',{ name: /days/i });
      const button = screen.getByRole('button');
      fireEvent.change(daysInput,{ target: { value: 3 } });
      fireEvent.submit(button);
      expect(props.handleSubmit).toHaveBeenCalled();
      expect(props.setUserInput).toHaveBeenCalledWith(3)
      expect(daysInput.value).toBe('2')
    })
  })
})