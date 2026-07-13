import { WEATHER_METRICS } from "../data/weatherMetrics";
import { getWeatherInfo } from "../data/getWeatherFromCode";
import WeatherIcon from "./weatherIcons/WeatherIcon";

function TodayWeatherMiniCard({data, i}) {
  const time = new Date(data.hourly.time[i]);
  const hour = new Date().getHours();
  const isNow = Number(hour) === Number(i);
  const getAM_PM = (date)=>{
    date = new Date(date);2
    const res = date.toLocaleString().slice(-3, );
    return res
  }
  
  const weatherInfo = getWeatherInfo( data?.hourly?.weather_code[i]);
  
  //removed : {' '}{time.toGMTString().slice(0,12)}

  return (
    <div className={`flex-1 basis-0 h-full flex flex-col items-start gap-1 p-2 glass-card text-white hover:translate-y-[-4px] transition-transform ease-in-out`}>
      <div className="h-full w-full relative flex justify-start items-center min-w-0 ">
        <p className="absolute top-0 right-0 text-xs mb-1">
          {time.getHours()%12}
          {getAM_PM(time)}
          -
          {(time.getHours()+1)%12}
          {getAM_PM(time.setHours(time.getHours()+1))}</p>
        <WeatherIcon
        weatherCode={data?.hourly?.weather_code[i]}
        size={80}
        className="mt-3"/>
      </div>
        {
          Object.entries(WEATHER_METRICS.hourly.miniCard).map(([key, val], j)=>{
            return(
              <div className='h-fit flex items-center justify-center min-w-0 text-sm' key={j}>
                <p key={key}>
                  {WEATHER_METRICS?.hourly?.miniCard[key]?.label}: {data.hourly[key][i]}{WEATHER_METRICS.hourly.miniCard[key].unit}
                </p>
              </div>
              )
          })
        }
    </div>
  )
}

export default TodayWeatherMiniCard