import React from 'react';
import { getAllByLabelText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import CurrencyTable from "../client/components/CurrencyTable.js";

describe('CurrencyTable unit tests', () => {
  
  describe('should render the table', () => {
    let table;
    const props = {
      currency: []
    }

    beforeAll(() => {
      table = render(<CurrencyTable {...props}/>);
    })

    it('should show empty table', async () => {
      const cells = screen.getByRole('table');
      expect(cells).toBeInTheDocument();
    })
  })
})

describe('CurrencyTable integration tests', () => {

  describe('Rows', () => {
    let table;
    const props = {
      currency:[{
        "base_currency_code": "USD",
        "base_currency_name": "United States dollar",
        "amount": "1.0000",
        "updated_date": "2023-02-15",
        "rates": {
            "BRL": {
                "currency_name": "Brazilian real",
                "rate": "5.2173",
                "rate_for_amount": "5.2173"
            }
        },
        "status": "success"
      },
      {
        "base_currency_code": "USD",
        "base_currency_name": "United States dollar",
        "amount": "1.0000",
        "updated_date": "2023-02-16",
        "rates": {
            "BRL": {
                "currency_name": "Brazilian real",
                "rate": "5.2400",
                "rate_for_amount": "5.2400"
            }
        },
        "status": "success"
    }]
    }

    beforeAll(() => {
      table = render(<CurrencyTable {...props}/>)
    });

    it('should display Code, Name, Amount, Date Updated, Code, Name, Conversion Rate', () => {
      const baseCode = table.getByTitle('baseCode');
      const baseName = table.getByTitle('baseName');
      const amount = table.getByTitle('amount');
      const dateUpdated = table.getByTitle('dateUpdated');
      const conversionCode = table.getByTitle('conversionCode');
      const conversionName = table.getByTitle('conversionName');
      const conversionRate = table.getByTitle('conversionRate');
      expect(baseCode).toBeInTheDocument();
      expect(baseName).toBeInTheDocument();
      expect(amount).toBeInTheDocument();
      expect(dateUpdated).toBeInTheDocument();
      expect(conversionCode).toBeInTheDocument();
      expect(conversionName).toBeInTheDocument();
      expect(conversionRate).toBeInTheDocument();
    })

    it('should have 2 rows of data', () => {
      render(<CurrencyTable {...props} />)
      const rows = screen.getAllByTestId('row');
      const expectedRows = props.currency.length;
      expect(rows.length).toEqual(expectedRows);
    })
    
    it('should display the data passed in through props', () => {
      render(<CurrencyTable {...props} />)
      const base_currency_code = screen.getAllByRole('cell', {name: "USD"});
      const base_currency_name = screen.getAllByRole('cell', {name: "United States dollar"});
      const amount = screen.getAllByRole('cell', {name: "1.0000"});
      const updated_date= screen.getAllByRole('cell', {name: "2023-02-16 undefined"});
      const conversion_currency_code = screen.getAllByRole('cell', {name: "BRL"});
      const conversion_currency_name = screen.getAllByRole('cell', {name: "Brazilian real"});
      const rate = screen.getAllByRole('cell', {name: "5.2173"});
      expect(base_currency_code.length).toEqual(2);
      expect(base_currency_name.length).toEqual(2);
      expect(amount.length).toEqual(2);
      expect(updated_date.length).toEqual(1);
      expect(conversion_currency_code.length).toEqual(2);
      expect(conversion_currency_name.length).toEqual(2);
      expect(rate.length).toEqual(1);
    })
  })
});