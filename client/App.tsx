import * as React from "react";
import { useEffect, useState } from "react";
import { parseConverterAPI } from './api/converter.js'
import CurrencyGraph from "./components/CurrencyGraph";
import CurrencyTable from "./components/CurrencyTable.js";
import { ExchangeData } from '../@types/types'

// const testData = [
//     {
//         "base_currency_code": "USD",
//         "base_currency_name": "United States dollar",
//         "amount": "1.0000",
//         "updated_date": "2023-02-12",
//         "rates": {
//             "BRL": {
//                 "currency_name": "Brazilian real",
//                 "rate": "5.2200",
//                 "rate_for_amount": "5.2200"
//             }
//         },
//         "status": "success"
//     },
//     {
//         "base_currency_code": "USD",
//         "base_currency_name": "United States dollar",
//         "amount": "1.0000",
//         "updated_date": "2023-02-16",
//         "rates": {
//             "BRL": {
//                 "currency_name": "Brazilian real",
//                 "rate": "5.2400",
//                 "rate_for_amount": "5.2400"
//             }
//         },
//         "status": "success"
//     },
//     {
//         "base_currency_code": "USD",
//         "base_currency_name": "United States dollar",
//         "amount": "1.0000",
//         "updated_date": "2023-02-13",
//         "rates": {
//             "BRL": {
//                 "currency_name": "Brazilian real",
//                 "rate": "5.1700",
//                 "rate_for_amount": "5.1700"
//             }
//         },
//         "status": "success"
//     },
//     {
//         "base_currency_code": "USD",
//         "base_currency_name": "United States dollar",
//         "amount": "1.0000",
//         "updated_date": "2023-02-15",
//         "rates": {
//             "BRL": {
//                 "currency_name": "Brazilian real",
//                 "rate": "5.2200",
//                 "rate_for_amount": "5.2200"
//             }
//         },
//         "status": "success"
//     },
//     {
//         "base_currency_code": "USD",
//         "base_currency_name": "United States dollar",
//         "amount": "1.0000",
//         "updated_date": "2023-02-14",
//         "rates": {
//             "BRL": {
//                 "currency_name": "Brazilian real",
//                 "rate": "5.1500",
//                 "rate_for_amount": "5.1500"
//             }
//         },
//         "status": "success"
//     }
// ]
// const testData1 = [
//     {
//   "base_currency_code": "USD",
//   "base_currency_name": "United States dollar",
//   "amount": "1.0000",
//   "updated_date": "2023-02-16",
//   "rates": {
//       "BRL": {
//           "currency_name": "Brazilian real",
//           "rate": "5.2173",
//           "rate_for_amount": "5.2173"
//       }
//   },
//   "status": "success"
// }
// ]

const App: React.FunctionComponent = () => {
    const [intervalId,setIntervalId] = useState <undefined | number> (undefined);
    const [historicalData,setHistoricalData] = useState <ExchangeData[]> ([])
    const [currency, setCurrency] = useState <ExchangeData[]> ([]);
    const [userInput,setUserInput] = useState <number> (1);
    
    const timeGen = (dateRange:number=0): [string,string] => {
        let today: Date = new Date();
        today.setDate(today.getDate() - dateRange);
        
        const year: number = today.getFullYear();
        const month: number = today.getMonth()+1 
        const day: number = today.getDate() 
        const dateStamp: string = year + "-" + month + "-" + day

        const currentTime: string = today.getHours() + ":"  
        + today.getMinutes() + ":" 
        + today.getSeconds() + " ET";
        return [currentTime,dateStamp];
      }

    useEffect(() => {
        // populate state immediately when page loads
        const asyncHelper = async () => {
            const conversionData = await parseConverterAPI();
            conversionData['timeStamp'] = timeGen()[0];
            setCurrency((currency) => [...currency,conversionData]);
        }
        asyncHelper()
          
        const id = window.setInterval(async () => {
            console.log('updating currency data every 6 seconds');
            const conversionData = await parseConverterAPI()
             conversionData['timeStamp'] = timeGen()[0];
            setCurrency((currency) => [...currency,conversionData]);
          },60 * 60 * 1000)

        setIntervalId(id);

        return () => { // cleanup function componentDidUnmount
            clearInterval(intervalId)
        }
    },[])

    return (
        <>
        <CurrencyGraph
        historicalData={historicalData}
        setHistoricalData={setHistoricalData}
        setUserInput={setUserInput}
        userInput={userInput}
        timeGen={timeGen}/>
        
        <CurrencyTable 
        currency={currency}/>
        </>
    )
}

export default App