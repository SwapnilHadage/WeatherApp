import { WEATHER_METRICS } from "../data/weatherMetrics"

function MiniCard({Icon, data, i}){
  const date = new Date(data.daily.time[i]);
  return (
  <div className={`flex-1 basis-0 min-w-0 h-50  flex flex-col p-1 border-1 border-gray-400 rounded-xl ${(i===0? 'bg-green-200':'bg-gray-200')} `}>
      <div className="h-[50%] relative flex justify-start items-center min-w-0 ">
        <p className="absolute top-0 right-0 text-sm ">{date.toGMTString().slice(0,12)}</p>
        <Icon size={80} className=""/>
      </div>
      <div className="h-[25%] flex items-center justify-center min-w-0 ">
        {`
          ${data?.daily?.temperature_2m_max[i]}${WEATHER_METRICS.weekly.miniCard.temperature_2m_max.unit} / ${data?.daily?.temperature_2m_min[i]}${WEATHER_METRICS.weekly.miniCard.temperature_2m_min.unit}
        `}
      </div>
      <div className="h-[25%] flex items-center justify-center min-w-0">
        {
          Object.entries(WEATHER_METRICS.weekly.miniCard).map(([key, val])=>{
            if(!key.includes("temperature")){
              return(
              <p key={key}>{WEATHER_METRICS.weekly.miniCard[key].label}: {data.daily[key][i]}{WEATHER_METRICS.weekly.miniCard[key].unit}</p>
              )
            }

            
          })
        }
      </div>
      
    </div>
  )
}

export default MiniCard