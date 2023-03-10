import React from "react";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { UserForm } from "./UserForm.js";
import { parseHistoricalAPI } from '../api/historical.js'

export default function CurrencyGraph ({historicalData,setHistoricalData,setUserInput,userInput,timeGen}){
  const sorted = historicalData.sort((a,b) => Date.parse(a.updated_date) - Date.parse(b.updated_date))
  const dates = sorted.map(el => el.updated_date)
  const rates = sorted.map(el => parseFloat(el.rates.BRL.rate))

  const historicalDates = (dateRange,dates=[]) => {
    if(dateRange === 0) return dates;
    dates.push(timeGen(dateRange)[1])
    return historicalDates(dateRange - 1,dates)
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const dates = historicalDates(userInput)

    let promises = [];
    dates.forEach(async el => {
        promises.push(parseHistoricalAPI(el));
      });
    setUserInput(1);

    try{
      const result = await Promise.all(promises);
      setHistoricalData(result)
    } catch(err){
      console.log(`Error fetching new historical data: ${err}`)
    }
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
        id: 1,
        label: 'BRL to 1 USD',
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