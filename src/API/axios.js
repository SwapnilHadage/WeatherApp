import axios from 'axios';


const forecast = [];

const weatherAxios = axios.create({
  baseURL : import.meta.env.VITE_WEATHER_API_URL,
  timeout : 5000,
});

const getCoordsAxios1 = axios.create({
  baseURL : import.meta.env.VITE_GET_COORDS_API_URL,
  timeout : 5000,
});

const getCoordsAxios2 = axios.create({
  baseURL : import.meta.env.VITE_GET_COORDS_FROM_PIN_API_URL,
  timeout : 5000,
})

const getCityFromCoords = axios.create({
  baseURL : import.meta.env.VITE_GET_CITY_FROM_COORDS_API_URL,
  timeout : 5000,
})

export { weatherAxios,
  getCoordsAxios1,
  getCoordsAxios2,
  getCityFromCoords,
  
};