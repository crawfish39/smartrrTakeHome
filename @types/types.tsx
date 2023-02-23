
interface ExchangeData{
  base_currency_code: string,
  base_currency_name: string,
  amount: number,
  updated_date: string,
  timeStamp?: string,
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

interface CurrencyTableProps {
  currency: ExchangeData[]
}

interface UserFormProps {
  setUserInput: React.Dispatch<React.SetStateAction<number>>
  userInput: number
  handleSubmit: (e: React.SyntheticEvent) => Promise<void>
}

export {ExchangeData, CurrencyGraphProps, CurrencyTableProps, UserFormProps}