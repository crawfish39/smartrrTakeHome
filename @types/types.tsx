
interface ExchangeData{
  base_currency_code: string,
  base_currency_name: string,
  amount: number,
  updated_date: string,
  rates: {
      BRL: {
          currency_name: string,
          rate: number,
          rate_for_amount: number
      }
  },
  status: string
}

interface CurrencyGraphProps {
  historicalData: ExchangeData[]
  setHistoricalData: React.Dispatch<React.SetStateAction<ExchangeData[]>>
  setUserInput: React.Dispatch<React.SetStateAction<number>>
  userInput: number
  timeGen: (dateRange?: number) => [string, string]
}


export {ExchangeData, CurrencyGraphProps}