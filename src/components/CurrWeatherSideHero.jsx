import { useRef, useEffect } from 'react';
import { WEATHER_METRICS } from '../data/weatherMetrics';
import { getMetricIcon } from '../data/iconFilterFunctions'
import { TbFaceIdError } from 'react-icons/tb'
import { CurrentMetricsLoading } from './WeatherLoading';
import MetricIcon from './weatherIcons/MetricIcon';
import { getWeatherIconKey, } from '../utils/getWeatherIconKey';


function CurrWeatherSideHero({data, loading, error, hasCoords}) {

  const scrollRef = useRef(null);
  useEffect(()=>{
    scrollRef?.current?.scrollIntoView({
      behavior: "instant",
      inline: "center",
      block: "nearest",
    });
  },[data]);

  const horizontalScroll = useRef(null);
  useEffect(()=>{
    const container = horizontalScroll.current;
    if(!container) return;
    const handleWheel = (e)=>{
      if(e.deltaY !== 0){
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, {
      passive : false,
    });

    return ()=>{
      container.removeEventListener("wheel", handleWheel);
    }
  },[loading, data, error, hasCoords])

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
    <div
  ref={horizontalScroll}
    className='w-full h-fit flex flex-nowrap gap-1 overflow-x-auto scrollbar-none py-3 '>
      {
        Object.entries(WEATHER_METRICS.current).map(([key, value])=>{
          const variable = data?.current?.[key];
          const Icon = getWeatherIconKey(value.label)
          
          if (!Icon) {
            return(
              <TbFaceIdError />
            )
          }
          return(
            <div className='w-auto h-full min-w-32 shrink-0 flex p-2
            glass-curr-card hover:translate-y-[-4px] transition-transform ease-in-out
            '
              key={key}
            ref={value.label==="Wind Direction" ? scrollRef : null}
            >
              <MetricIcon
                icon={Icon}
                size={50}
                className=''
              />
              <div className='flex flex-col items-center'>
                <p className='flex text-base
                '>
                  {value.label}
                </p>
                <p className='text-sm'>
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
