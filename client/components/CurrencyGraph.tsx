import * as React from "react";
// import 'chart.js/auto';
import {Chart,CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Line } from 'react-chartjs-2';
import { UserForm } from "./UserForm";
import { parseHistoricalAPI } from '../api/historical'
import { ExchangeData,CurrencyGraphProps } from '../../@types/types'

Chart.register(CategoryScale,LinearScale,PointElement,LineElement);


const CurrencyGraph = ({historicalData,setHistoricalData,setUserInput,userInput,timeGen}: CurrencyGraphProps): JSX.Element =>{
  const sorted = historicalData.sort((a: ExchangeData, b: ExchangeData) => Date.parse(a.updated_date) - Date.parse(b.updated_date))
  const dates = sorted.map((el: ExchangeData) => el.updated_date)
  const rates = sorted.map((el: ExchangeData) => el.rates.BRL.rate)

  const historicalDates = (dateRange:number,dates:string[]=[]): string[] => {
    if(dateRange === 0) return dates;
    dates.push(timeGen(dateRange)[1])
    return historicalDates(dateRange - 1,dates)
  }

  const handleSubmit = async (e:React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const dates = historicalDates(userInput)
      
    let promises: Promise<ExchangeData>[] = [];
    dates.forEach( el => {
        promises.push(parseHistoricalAPI(el))
      });
      
      try{
        const result: ExchangeData[] = await Promise.all(promises)
        setHistoricalData(result)
      } catch(err) {
        console.log(`Error fetching new historical data: ${err}`)
      }

    setUserInput(1);
  }

  return(
    <div className="chart-container">
      <h2 style={{textAlign: "center"}}>BRL to USD Exchange Rate Over Time</h2>
      <UserForm
      handleSubmit={handleSubmit}
      setUserInput={setUserInput}
      userInput={userInput}/>
      <Line title="line-chart"
  datasetIdKey='id'
  data={{
    labels: dates,
    datasets: [
      {
        type: 'line',
        label: 'BRL to 1 USD',
        backgroundColor: 'black',
        borderColor: 'blue',
        data: rates,
      },
    ],
  }}
  options = {{
    scales: {
      x: {
        title: {
          color: 'blue',
          display: true,
          text: 'Day'
        }
      },
      y: {
        title: {
          color: 'blue',
          display: true,
          text: 'Exchange Rate'
        }
      }
    }
    }  
  }   
  
/>
    </div>
)}

export default CurrencyGraph