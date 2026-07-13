import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { todayWeather } from "../redux/slices/setupSlice"
import { Header2, TodayWeatherHero } from "../components";

function TodaysWeather() {

  const dispatch = useDispatch();
  const { coords, todaysWeatherData, loading, error, } = useSelector(state=>state.setup);

  useEffect(()=>{
    if(coords){
      dispatch(todayWeather(coords));
    }
  },[coords, dispatch]);
  // useEffect(()=>{
  //   if (todaysWeatherData) {
  //     console.log(todaysWeatherData);
  //   }
  // },[todaysWeatherData])

  return (
    <div className="size-full min-h-0 flex flex-col overflow-hidden">
      
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth ">
        <TodayWeatherHero
        data = {todaysWeatherData}
        loading = {loading}
        error = {error}
        hasCoords = {Boolean(coords)} />
        </div>
    </div>
  )
}

export default TodaysWeather