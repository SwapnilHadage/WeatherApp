// weatherMetrics.js

export const WEATHER_METRICS = {
  current: {
    temperature_2m: {
      label: "Temperature",
      unit: "°C",
    },

    relative_humidity_2m: {
      label: "Humidity",
      unit: "%",
    },

    cloud_cover: {
      label: "Cloud Cover",
      unit: "%",
    },

    wind_speed_10m: {
      label: "Wind Speed",
      unit: "km/h",
    },

    wind_direction_10m: {
      label: "Wind Direction",
      unit: "°",
    },

    wind_gusts_10m: {
      label: "Wind Gusts",
      unit: "km/h",
    },

    precipitation: {
      label: "Precipitation",
      unit: "mm",
    },

    rain: {
      label: "Rain",
      unit: "mm",
    },

    snowfall: {
      label: "Snowfall",
      unit: "cm",
    },
  },

  hourly: {
    miniCard : {
      temperature_2m: {
        label: "Temperature",
        unit: "°C",
    },

    precipitation_probability: {
      label: "Rain Chance",
      unit: "%",
    }
    },
    detailed: {
    relative_humidity_2m: {
      label: "Humidity",
      unit: "%",
    },

    cloud_cover: {
      label: "Cloud Cover",
      unit: "%",
    },

    precipitation: {
      label: "Precipitation",
      unit: "mm",
    },

    visibility: {
      label: "Visibility",
      unit: "m",
    },

    uv_index: {
      label: "UV Index",
      unit: "",
    },

    wind_speed_120m: {
      label: "Wind Speed",
      unit: "km/h",
    },

    wind_direction_120m: {
      label: "Wind Direction",
      unit: "°",
    },
    },
  },

  weekly: {
    miniCard : {
      temperature_2m_max: {
      label: "Max Temperature",
      unit: "°C",
    },

    temperature_2m_min: {
      label: "Min Temperature",
      unit: "°C",
    },

    precipitation_probability_max: {
      label: "Rain Chance",
      unit: "%",
    },
    },

    detailed: {
      precipitation_sum: {
      label: "Precipitation",
      unit: "mm",
    },

    relative_humidity_2m_mean: {
      label: "Humidity",
      unit: "%",
    },

    uv_index_max: {
      label: "UV Index",
      unit: "",
    },

    wind_speed_10m_max: {
      label: "Wind Speed",
      unit: "km/h",
    },

    wind_gusts_10m_max: {
      label: "Wind Gusts",
      unit: "km/h",
    },

    wind_direction_10m_dominant: {
      label: "Wind Direction",
      unit: "°",
    },

    sunrise: {
      label: "Sunrise",
      unit: "",
    },

    sunset: {
      label: "Sunset",
      unit: "",
    },
    }
  },
};