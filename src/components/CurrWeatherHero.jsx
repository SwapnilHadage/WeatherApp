import { WiDegrees } from "react-icons/wi";
import { WEATHER_ICONS } from '../data/icons';
import { getWeatherInfo } from '../data/getWeatherFromCode'
import { CurrentWeatherLoading } from "./WeatherLoading";

function CurrWeatherHero({data, loading, error, hasCoords}) {
  
  
  if(!hasCoords){
    return <div className='w-150 h-100 rounded-2xl bg-gray-100 flex m-3'>
      <div className='bg-gray-300 w-full h-min rounded-2xl rounded-b-none p-3'>
        <p className='text-center '>Search Location or enable Current Location using above button</p>
      </div>
    </div>
  }

  if(loading){
    return <CurrentWeatherLoading />
  }

  if(error || !data?.current){
    return <div className='w-150 h-100 rounded-2xl bg-gray-100 flex m-3'>
      <div className='bg-gray-300 w-full h-min rounded-2xl rounded-b-none p-3'>
        <p className='text-center '>Error</p>
      </div>
    </div>
  }

  const weatherInfo = getWeatherInfo( data?.current?.weather_code);
  const Icon = WEATHER_ICONS[weatherInfo?.icon];

  return (
    <div className='w-150 h-80 rounded-2xl bg-gray-100 flex flex-col m-3 gap-0 p-0'>
      {/*Time Header*/}
      <div className='bg-gray-300 w-full h-min rounded-2xl rounded-b-none p-3 pr-6 '>
        <p className='text-right '
        >As of {data?.current?.time?.slice(11)} {data.timezone}</p>
      </div>
      {/*Temp and icon*/}
      <div className="w-full h-[70%] flex flex-start items-center px-5 ">
        <div className='w-fit text-9xl font-mono h-full flex items-center'>
          <p>{Math.round(data.current.temperature_2m)}</p>
        </div>
        <div className='w-[30%] h-full relative flex flex-start transparent max-w-fit max-h-fit'>
          <WiDegrees className='color-black bg-tranparent size-auto relative right-15 w-40'/>
        </div>
        <div className='size-full flex items-center '> 
          {
            data && 
            <Icon className='size-40 bg-tranparent relative right-30'/>
          }
        </div>
      </div>
      {/*info*/}
      <div className='w-full flex-1 rounded-2xl rounded-t-none  flex items-center px-5 text-black mb-7'>
        <p className='text-2xl '>
          {weatherInfo?.description}
        </p>
      </div>
    </div>
  )
}

export default CurrWeatherHero
