import { WEATHER_METRICS } from '../data/weatherMetrics';
import { getMetricIcon } from '../data/iconFilterFunctions'
import { TbFaceIdError } from 'react-icons/tb'
import { CurrentMetricsLoading } from './WeatherLoading';

function CurrWeatherSideHero({data, loading, error, hasCoords}) {

  if(!hasCoords){
    return(
    <div className='w-150 h-100 rounded-2xl bg-gray-100 flex m-3'>
      No coords
    </div>
    )
  }

  if(loading){
    return <CurrentMetricsLoading />
  }

  if(error || !data?.current){
    return(
    <div className='w-150 h-100 rounded-2xl bg-gray-100 flex m-3'>
      No coords
    </div>
    )
  }
  return (
    <div className='w-auto h-20 bg-gray-300 m-3 flex flex-wrap justify-evenly'>
      {
        Object.entries(WEATHER_METRICS.current).map(([key, value])=>{
          const variable = data?.current?.[key]
          const Icon = getMetricIcon(key,variable)
          
          if (!Icon) {
            return(
              <TbFaceIdError />
            )
          }
          
          return(
            <div className='w-auto h-full flex flex-col p-2' key={key}>
              <div className='flex '>
                <Icon size={30} className=''/>
                <p>
                  {value.label}
                </p>
              </div>
              <div className='flex justify-center'>
                <p>
                  {variable}{value.unit}
                </p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default CurrWeatherSideHero
