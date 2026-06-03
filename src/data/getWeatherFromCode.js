import WEATHER_CODES from "./weatherCodes";

export function getWeatherInfo(code) {
  return WEATHER_CODES[code] ?? {
    description : "Unknown",
    icon: "WiDaySunny",
    label : "Unknown",
  };
}