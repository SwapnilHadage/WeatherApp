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
  const imgUrl = weatherInfo.background ? `/weatherPics/${weatherInfo.background}` : null;
  console.log(imgUrl);
  

  return (
    <div className={`w-full h-80 rounded-2xl bg-${imgUrl ? `[url(${imgUrl})]` : 'gray-100'} flex flex-col gap-0 p-0 bg-cover bg-center bg-no-repeat text-white brightness-98 
    md:w-150`}
    style={{backgroundImage: imgUrl ? `url("${imgUrl}")` : undefined }}>
      {/*Time Header*/}
      <div className=' w-full h-min rounded-2xl rounded-b-none p-3 pr-6 bg-gradient-to-b from-black/10 via-black/5 to-transparent'>
        <p className='text-right text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]'
        >As of {data?.current?.time?.slice(11)} {data.timezone}</p>
      </div>
      {/*Temp and icon*/}
      <div className="w-full h-[70%] flex flex-start items-center  ">
        <div className='w-fit text-8xl font-mono h-full flex items-center
        md:text-9xl'>
          <p>{Math.round(data.current.temperature_2m)}</p>
        </div>
        <div className='w-[50%] h-full relative flex flex-start transparent max-w-fit max-h-fit '>
          <WiDegrees className=' bg-tranparent size-auto relative right-12 text-7xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]
          md:right-15
          md:w-40'/>
        </div>
        <div className='size-full flex items-center '> 
          {
            data && 
            <Icon className='size-30 bg-tranparent relative right-25
            md:size-40
            md:right-40
            '/>
          }
        </div>
      </div>
      
      {/*info*/}
      <div className='w-full flex-1 rounded-2xl rounded-t-none  flex items-center justify-center text-white  text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] p-4
      md:justify-start'>
        <p className='text-xl md:text-2xl'>
          {weatherInfo?.description}
        </p>
      </div>
    </div>
  )
}

export default CurrWeatherHero
