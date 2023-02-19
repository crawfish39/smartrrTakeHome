import React, { useEffect, useState } from "react";
import { parseConverterAPI } from './api/converter.js'
import CurrencyGraph from "./components/CurrencyGraph.js";
import CurrencyTable from "./components/CurrencyTable.js";

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

export default function App(){
    const [intervalId,setIntervalId] = useState(null);
    const [historicalData,setHistoricalData] = useState([])
    const [currency, setCurrency] = useState([]);
    const [userInput,setUserInput] = useState(1);
    
    const timeGen = (dateRange=0) => {
        let today = new Date();
        today.setDate(today.getDate() - dateRange);
        
        const year = today.getFullYear();
        const month = today.getMonth()+1 
        const day = today.getDate() 
        const dateStamp = year + "-" + month + "-" + day

        const currentTime = today.getHours() + ":"  
        + today.getMinutes() + ":" 
        + today.getSeconds() + " ET";
        return [currentTime,dateStamp];
      }
    // 2023-02-19 17:49:47 ET,2023-2-19
    useEffect(() => {
        // populate state immediately when page loads
        const asyncHelper = async () => {
            const conversionData = await parseConverterAPI();
            conversionData['timeStamp'] = timeGen()[0];
            setCurrency((currency) => [...currency,conversionData]);
        }
        asyncHelper()
          
        const id = setInterval(async () => {
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