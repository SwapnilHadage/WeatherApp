import WEATHER_CODES from "./weatherCodes";

export function getWeatherInfo(code) {
  return WEATHER_CODES[code] ?? {
    description : "Unknown",
    icon: "unknown",
    label : "Unknown",
    category: null,
    background: null,
  };
}