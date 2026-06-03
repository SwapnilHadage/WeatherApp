import {
  WiSnow,
  WiThermometer,
  WiDaySunny,
  WiHot,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiSprinkle,
  WiRain,
  WiShowers,
  WiSnowWind,
  WiWindy,
  WiStrongWind,
  WiHumidity,
  WiBarometer,
  WiDirectionUp,
  WiDaySunnyOvercast,
  WiMoonAltWaxingCrescent4,
  WiSunrise,
  WiSunset,
  WiDayHaze,
  WiRaindrop,
} from "react-icons/wi";

/* ---------------- TEMPERATURE ---------------- */

function getTemperatureIcon(temp) {
  if (temp <= 0) return WiSnow;
  if (temp <= 15) return WiThermometer;
  if (temp <= 30) return WiDaySunny;
  return WiHot;
}

/* ---------------- CLOUD COVER ---------------- */

function getCloudCoverIcon(cloudCover) {
  if (cloudCover <= 10) return WiDaySunny;
  if (cloudCover <= 40) return WiDayCloudy;
  if (cloudCover <= 80) return WiCloud;
  return WiCloudy;
}

/* ---------------- PRECIPITATION ---------------- */

function getPrecipitationIcon(amount) {
  if (amount <= 0) return WiSprinkle;
  if (amount < 2) return WiSprinkle;
  if (amount < 10) return WiRain;
  return WiShowers;
}

/* ---------------- PRECIPITATION PROBABILITY ---------------- */

function getPrecipitationProbabilityIcon(probability) {
  if (probability < 20) return WiSprinkle;
  if (probability < 60) return WiRain;
  return WiShowers;
}

/* ---------------- SNOW ---------------- */

function getSnowfallIcon(snowfall) {
  if (snowfall <= 0) return WiSnow;
  if (snowfall < 5) return WiSnow;
  return WiSnowWind;
}

/* ---------------- WIND ---------------- */

function getWindSpeedIcon(speed) {
  if (speed < 25) return WiWindy;
  return WiStrongWind;
}

/* ---------------- METRIC ICON RESOLVER ---------------- */

export function getMetricIcon(metric, value) {
  const dynamicIconMap = {
    // Current
    temperature_2m: getTemperatureIcon,
    apparent_temperature: getTemperatureIcon,

    cloud_cover: getCloudCoverIcon,

    rain: getPrecipitationIcon,
    precipitation: getPrecipitationIcon,

    snowfall: getSnowfallIcon,

    wind_speed_10m: getWindSpeedIcon,
    wind_gusts_10m: getWindSpeedIcon,

    // Hourly
    precipitation_probability: getPrecipitationProbabilityIcon,

    wind_speed_120m: getWindSpeedIcon,

    // Daily
    temperature_2m_max: getTemperatureIcon,
    temperature_2m_min: getTemperatureIcon,

    precipitation_probability_max:
      getPrecipitationProbabilityIcon,

    precipitation_sum: getPrecipitationIcon,

    wind_speed_10m_max: getWindSpeedIcon,
    wind_gusts_10m_max: getWindSpeedIcon,
  };

  const staticIconMap = {
    // Current
    relative_humidity_2m: WiHumidity,
    sea_level_pressure: WiBarometer,
    surface_pressure: WiBarometer,

    wind_direction_10m: WiDirectionUp,

    is_day: value
      ? WiDaySunny
      : WiMoonAltWaxingCrescent4,

    visibility: WiDayHaze,
    uv_index: WiDaySunny,

    // Hourly
    wind_direction_120m: WiDirectionUp,

    // Daily
    relative_humidity_2m_mean: WiHumidity,

    uv_index_max: WiDaySunny,

    wind_direction_10m_dominant: WiDirectionUp,

    sunrise: WiSunrise,
    sunset: WiSunset,
  };

  if (metric in dynamicIconMap) {
    return dynamicIconMap[metric](value);
  }

  return staticIconMap[metric] ?? WiDaySunnyOvercast;
}