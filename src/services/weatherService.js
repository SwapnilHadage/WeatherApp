import axios from "axios";
import { weatherAxios, getCoordsAxios1, getCoordsAxios2, getCityFromCoords } from "../API/axios";

const current_variables = ['temperature_2m',
  'relative_humidity_2m',
  'wind_speed_10m',
  'wind_direction_10m',
  'wind_gusts_10m',
  'precipitation',
  'rain',
  'showers',
  'snowfall',
  'cloud_cover',
  'is_day',
  'weather_code',
];
const hour_variables = [
  'temperature_2m',
  'relative_humidity_2m',
  'dew_point_2m',
  'precipitation',
  'precipitation_probability',
  'pressure_msl',
  'cloud_cover',
  'visibility',
  'wind_speed_120m',
  'wind_direction_120m',
  'temperature_120m',
  'soil_temperature_18cm',
  'soil_moisture_9_to_27cm',
  'uv_index',
  'weather_code',

];
const week_variables = ['temperature_2m_max',
  'temperature_2m_min',
  'wind_speed_10m_max',
  'wind_gusts_10m_max',
  'wind_direction_10m_dominant',
  'sunrise',
  'sunset',
  'uv_index_max',
  'precipitation_sum',
  'precipitation_hours',
  'precipitation_probability_max',
  'snowfall_sum',
  'rain_sum',
  'showers_sum',
  'daylight_duration',
  'cloud_cover_max',
  'cloud_cover_mean',
  'precipitation_probability_mean',
  'precipitation_probability_min',
  'relative_humidity_2m_max',
  'relative_humidity_2m_min',
  'relative_humidity_2m_mean',
  'visibility_mean',
  'weather_code',

];

const CurrentWeatherFetch = async (coords) => {            //current weather
  const res = await weatherAxios.get('/forecast', {
    params: {
      latitude: coords.lat,
      longitude: coords.lon,
      current: current_variables.join(',')
    }
  })
  return res.data;
}

const DailyWeatherFetch = async (coords) => {               //forecast per hour
  const res = await weatherAxios.get('/forecast', {
    params: {
      latitude: coords.lat,
      longitude: coords.lon,
      hourly: hour_variables.join(','),
      forecast_days: '1',

    }
  }
  )
  return res.data;
}

const WeeklyWeatherFetch = async (coords) => {             //forecast per day of week
  const res = await weatherAxios.get('/forecast', {
    params: {
      latitude: coords.lat,
      longitude: coords.lon,
      daily: week_variables.join(','),
      forecast_days: 7,
      timezone: 'auto',
    }
  })
  return res.data;
}

const GetLocFromCity = async (city) => {
  const res = await getCoordsAxios1.get('/search', {
    params: {
      name: city,
      count: 1,
      format: 'json',
    }
  })
  const resCoords = {
    lat: res?.data?.results[0]?.latitude,
    lon: res?.data?.results[0]?.longitude,
  }
  return resCoords;


}

const GetLocFromPincode = async (pin) => {
  const res = await getCoordsAxios2.get('/search', {
    params: {
      postalcode: pin,
      country: 'India',
      format: 'jsonv2',
    }
  })

  console.log(res?.data);

  if (res?.data && res.data.length > 0) {
    return {
      lat: Number(res.data[0].lat),
      lon: Number(res.data[0].lon),
    };
  }
  throw new Error("No location found for the given pincode.");
}

const GetCityFromCoords = async (coords) => {
  const res = await getCityFromCoords.get('/reverse', {
    params: {
      lat: coords.lat,
      lon: coords.lon,
      zoom: 18,
      format: 'jsonv2',

    }
  })
  return res;
}

const getWeatherAnalysis = async (data) =>{
  const res = await axios.post('api/weatherAnalysisAi',{
    data : data,
  });

  console.log(res.data);
  return res?.data;
  
}

export {
  CurrentWeatherFetch,
  DailyWeatherFetch,
  WeeklyWeatherFetch,
  GetLocFromCity,
  GetLocFromPincode,
  GetCityFromCoords,

  getWeatherAnalysis,

}