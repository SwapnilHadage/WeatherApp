import "./WeatherIcon.css";
import {getWeatherInfo, } from '../../data/getWeatherFromCode';
import { WEATHER_ICON_MAP } from "../../constants/weatherIconMap";
import {getWeatherIconKey, } from '../../utils/getWeatherIconKey';


function WeatherIcon({
    weatherCode ,
    size = 120,
    className = "",
    alt = "",
    isDay="true"
}) {
    
    const weather = getWeatherInfo(weatherCode);
    const iconKey = getWeatherIconKey(weather.icon, isDay);
    const icon = WEATHER_ICON_MAP[iconKey] ?? WEATHER_ICON_MAP.unknown;

    return (
        <img
            src={icon}
            alt={alt ?? weather.label}
            width={size}
            height={size}
            draggable={false}
            loading="lazy"
            className={`weather-icon ${className}`}
        />
    );

}

export default WeatherIcon;