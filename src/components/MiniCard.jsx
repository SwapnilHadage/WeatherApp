import { WEATHER_METRICS } from "../data/weatherMetrics"
import { getWeatherInfo } from "../data/getWeatherFromCode";
import {WEATHER_COLORS, } from '../data/weatherColors'
import WeatherIcon from "./weatherIcons/WeatherIcon";
import { getWeatherIconKey } from "../utils/getWeatherIconKey";
import { WEATHER_ICON_MAP} from '../constants/weatherIconMap'


function MiniCard({ data, i}){
  
  const date = new Date(data.daily.time[i]);
  const weatherInfo = getWeatherInfo(data.daily.weather_code[i]);
  const weather = getWeatherInfo(data.daily.weather_code[i]);
  
  return (
  <div className={`flex-1 h-fit basis-0 min-w-0   flex flex-col px-1 items-start justify-between gap-0 overflow-hidden glass-card p-2 text-white hover:translate-y-[-4px] transition-transform ease-in-out `}>
      <div className="h-fit w-full relative flex justify-start items-center min-w-0 ">
        <p className="absolute top-0 right-0 text-xs ">{date.toGMTString().slice(0,12)}</p>
        <WeatherIcon
        weatherCode={data?.daily?.weather_code?.[i]}
        size={80}
        className={`mt-4 ${WEATHER_COLORS[weatherInfo.category]}`}/>
      </div>
      <div className="flex flex-col items-start p-1">
        <div className="h-fit flex items-center justify-center min-w-0 text-sm ">
        {`
          ${data?.daily?.temperature_2m_max[i]}${WEATHER_METRICS.weekly.miniCard.temperature_2m_max.unit} / ${data?.daily?.temperature_2m_min[i]}${WEATHER_METRICS.weekly.miniCard.temperature_2m_min.unit}
        `}
      </div>
      <div className="h-fit flex pb-2 items-center justify-center min-w-0 text-sm">
        {
          Object.entries(WEATHER_METRICS.weekly.miniCard).map(([key, val])=>{
            if(!key.includes("temperature")){
              return(
              <p key={key}
              className='text-wrap text-sm'
              >{WEATHER_METRICS.weekly.miniCard[key].label}: {data.daily[key][i]}{WEATHER_METRICS.weekly.miniCard[key].unit}
              </p>
              )
            }

            
          })
        }
      </div>
      </div>
      
    </div>
  )
}

export default MiniCard