import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { weekWeather } from "../redux/slices/setupSlice"
import { use } from "react";
import { Header2, WeekWeatherHero } from "../components";

function WeekWeather() {

  const dispatch = useDispatch();
  const { coords, weekWeatherData, loading, error, } = useSelector(state=>state.setup);

  useEffect(()=>{
    if(coords){
      dispatch(weekWeather(coords));
    }
  },[coords, dispatch]);



  return (
    <div className="w-full h-full min-h-0 flex flex-col overflow-hidden mb-14 md:mb-7">
      
      <div className="flex-1 min-h-0 border-none outline-none">
      <WeekWeatherHero
            data = {weekWeatherData}
            loading = {loading}
            error = {error}
            hasCoords = {Boolean(coords)} />
      </div>
    </div>
  )
}

export default WeekWeather