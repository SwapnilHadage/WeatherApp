import { WEATHER_ICON_MAP } from "../constants/weatherIconMap";

export function getWeatherIconPath(iconKey, style = "flat") {
  const file = WEATHER_ICON_MAP[iconKey] ?? WEATHER_ICON_MAP.unknown;

  return `/node_modules/@meteocons/svg/${style}/${file}.svg`;
}