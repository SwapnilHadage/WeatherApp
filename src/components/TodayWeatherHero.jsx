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
        <div className="size-full flex items-center justify-center p-2 pb-4 ">
          <div className="w-full rounded-xl gap-2 grid grid-cols-2 items-stretch
          md:grid-cols-7 ">
        {
          data?.hourly?.weather_code.map((code, i)=>{
            const hr = new Date(data.hourly.time[i]).getHours();
            if(Number(hr) >= Number(new Date().getHours())){
              
              return(
              <TodayWeatherMiniCard
                data = {data}
                i={i}
                key={i}
              />
            )
            }else{
              
              return null;
            }
          })
        }
      </div>
    </div>
  )
}

export default TodayWeatherHero
