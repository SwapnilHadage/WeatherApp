import {getWeatherInfo, } from "../data/getWeatherFromCode"
import {WEATHER_ICONS} from "../data/icons"
import {TodayWeatherMiniCard } from "../components";
import { TodayWeatherLoading } from "./WeatherLoading";


function TodayWeatherHero({data, error, loading, hasCoords}) {
  if(!hasCoords){
    return <div className='w-150 h-100 rounded-2xl bg-gray-100 flex m-3'>
      <div className='bg-gray-300 w-full h-min rounded-2xl rounded-b-none p-3'>
        <p className='text-center '>Search Location or enable Current Location using above button</p>
      </div>
    </div>
  }
  if(loading){
    return <TodayWeatherLoading />
  }
  if(error || !data?.hourly){
    if (error) {
      return <Error error={error}/>
    }
  }

  return (
    <div className="min-h-full flex flex-row flex-wrap size-full justify-center content-start items-start rounded-xl gap-4 p-3 min-w-screen ">
        {
          data?.hourly?.weather_code.map((code, i)=>{
            const weatherInfo = getWeatherInfo(code);
            const Icon = WEATHER_ICONS[weatherInfo.icon];

            return(
              <TodayWeatherMiniCard
              Icon = {Icon}
              data = {data}
              i={i}
              key={i}
              />
            )

          })
        }
    </div>
  )
}

export default TodayWeatherHero
