import { WEATHER_METRICS } from "../data/weatherMetrics";

function TodayWeatherMiniCard({data, Icon, i}) {
  const time = new Date(data.hourly.time[i]);
  const hour = new Date().getHours();
  const isNow = Number(hour) === Number(i);
  return (
    <div className={`w-40 h-40 flex flex-col p-1 border border-gray-400 rounded-xl ${ isNow? 'bg-green-200' : 'bg-gray-200' }`}>
      <div className="h-[50%] relative flex justify-start items-center min-w-0 ">
        <p className="absolute top-0 right-0 text-sm ">{time.toGMTString().slice(0,12)}</p>
        <Icon size={80} className=""/>
      </div>
        {
          Object.entries(WEATHER_METRICS.hourly.miniCard).map(([key, val])=>{
            if(!key.includes("temperature")){
              return(
                <div className='h-[25%] flex items-center justify-center min-w-0' key={i}>
                  <p key={key}>
                    {WEATHER_METRICS?.hourly?.miniCard[key]?.label}: {data.hourly[key][i]}{WEATHER_METRICS.hourly.miniCard[key].unit}
                  </p>
                </div>
                )
            }
          })
        }
    </div>
  )
}

export default TodayWeatherMiniCard