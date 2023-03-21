import axios from 'axios'

const countryData = (search, fulltxt) => {
  const url = `https://restcountries.com/v3.1/name/${search}?fullText=${fulltxt}`
  return axios.get(url).then((response) => response.data)
}

const weatherData = (capital) => {
  return axios.get(`/api/weather?capital=${capital}`).then((response) => response.data)
}

export default { countryData, weatherData }
