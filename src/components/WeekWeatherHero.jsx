import { getWeatherInfo } from "../data/getWeatherFromCode"
import { WEATHER_ICONS } from "../data/icons";
import { getWeatherIconKey } from "../utils/getWeatherIconKey";
import MiniCard from "./MiniCard";
import { WeekWeatherLoading } from "./WeatherLoading";


function WeekWeatherHero({ data, loading, error, hasCoords }){

  if(!hasCoords){
    return <div className='w-150 h-100 rounded-2xl bg-gray-100 flex m-3'>
      <div className='bg-gray-300 w-full h-min rounded-2xl rounded-b-none p-3'>
        <p className='text-center '>Search Location or enable Current Location using above button</p>
      </div>
    </div>
  }
  if(loading){
    return <WeekWeatherLoading />
  }
  if(error || !data?.daily){
    return <div className='w-150 h-100 rounded-2xl bg-gray-100 flex m-3'>
      <div className='bg-gray-300 w-full h-min rounded-2xl rounded-b-none p-3'>
        <p className='text-center '>Error</p>
      </div>
    </div>
  }
  return (
    <div className="size-full flex items-center justify-center p-2 pb-4 bg-transparent ">
      <div className="w-full rounded-xl gap-2 grid grid-cols-2 items-stretch bg-white/0
      md:grid-cols-7 ">
        {
        data.daily.weather_code.slice(0,8).map((code, i)=>{
            const weatherInfo = getWeatherInfo(code);
            return(
              <MiniCard
                data = {data}
                i ={i}
                key={i}
            />
          )
          }
        )
      }
      </div>
    </div>
  )
}
export default WeekWeatherHero;
