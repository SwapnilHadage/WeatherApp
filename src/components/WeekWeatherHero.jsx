import { getWeatherInfo } from "../data/getWeatherFromCode"
import { WEATHER_ICONS } from "../data/icons";
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
    <div className="size-full flex bg-white items-center justify-center border-1 border-gray-200 p-[2%] ">
      <div className="flex flex-row flex-nowrap w-full rounded-xl gap-2">
        {
        data.daily.weather_code.slice(0,8).map((code, i)=>{
            const weatherInfo = getWeatherInfo(code);
            const Icon = WEATHER_ICONS[weatherInfo.icon];
            
            return(
              <MiniCard
                Icon = {Icon}
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
