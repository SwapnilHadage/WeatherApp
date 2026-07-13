export function getWeatherIconKey(icon, isDay = true) {
    switch (icon) {
    /* ===========================
        WEATHER CONDITIONS
       =========================== */

    case "clear":
        return isDay ? "clear_day" : "clear_night";

    case "partly_cloudy":
        return isDay ? "partly_cloudy_day" : "partly_cloudy_night";

    case "cloudy":
      return "cloudy";

    case "fog":
      return isDay ? "fog_day" : "fog_night";

    case "drizzle":
      return "drizzle";

    case "rain":
      return "rain";

    case "heavy_rain":
      return "heavy_rain";

    case "snow":
      return "snow";

    case "heavy_snow":
      return "heavy_snow";

    case "sleet":
      return "sleet";

    case "thunderstorm":
      return "thunderstorm";

    case "hail":
      return "hail";

    /* ===========================
       METRICS
       =========================== */

    case "Temperature":
    case "Max Temperature":
    case "Min Temperature":
        return "temperature";

    case "Humidity":
        return "humidity";

    case "Cloud Cover":
        return "cloudy";

    case "Wind Speed":
    case "Wind Gusts":
        return "wind";

    case "Wind Direction":
        return "compass";

    case "Pressure":
        return "pressure";

    case "Visibility":
        return "visibility";

    case "UV Index":
        return "uv";

    case "Precipitation":
        return "precipitation";

    case "Rain":
    case "Rain Chance":
        return "rain";

    case "Snowfall":
        return "snow";

    case "Sunrise":
        return "sunrise";

    case "Sunset":
        return "sunset";

    default:
        return "unknown";
    }
}