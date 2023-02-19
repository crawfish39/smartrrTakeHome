
const parseConverterAPI = async () => {
  const url = 'https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=USD&to=BRL&amount=1';
  
  const options = {
    method: 'GET',
    url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
    params: {format: 'json', from: 'AUD', to: 'CAD', amount: '1'},
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
    console.log(`error fetching currency converter: ${error}`)
  }
  return data;
}

export { parseConverterAPI }