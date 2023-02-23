
const parseHistoricalAPI = async (date: string) => { // date format: 2020-01-20
  const url = `https://currency-converter5.p.rapidapi.com/currency/historical/${date}?from=USD&amount=1&format=json&to=BRL`;  
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ba076f7b93msh8e3347cd6aac09bp15401ajsn8b5099fd086b',
      'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
    }
  };
  
  let data;
  try {
    const result = await fetch(url, options);
    data = await result.json();

  } catch (error) {
    console.log(`error fetching historical currency: ${error}`)
  }
  return data;
}

export { parseHistoricalAPI }


