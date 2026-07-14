import { Language } from "@google/genai";
import { getWeatherAnalysis } from "../services/weatherService"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


function AiAnalysis() {
  const getAnalysis = async(data)=>{
    try {
      const analysisData = await getWeatherAnalysis(data);
      console.log(analysisData);
    } catch (error) {
      console.error("Weather Analysis Failed", error);
    }
  }
  const { loading, error, currentWeatherData, todaysWeatherData, weekWeatherData, coords, language, } = useSelector(state=>state.setup);


  useEffect(()=>{
    if(coords &&
      !error &&
      !loading &&
      currentWeatherData &&
      todaysWeatherData &&
      weekWeatherData){
      getAnalysis({
        role: 'general',
        language,
        weatherData: {
          currentWeatherData,
          todaysWeatherData,
          weekWeatherData,
        }
      });
    }
  },[
      currentWeatherData,
      todaysWeatherData,
      weekWeatherData,
    ])
  
  return (
    <div
    className="bg-red-800 w-[100%] h-75"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore officia itaque accusantium ipsam ea natus libero possimus quod perferendis omnis doloremque nesciunt dignissimos, beatae eum quis quam? Ullam, maxime aliquid?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ab dignissimos vitae laudantium velit! Dolore ipsa recusanetur adipisicing elit. Voluptate ab dignissimos vitae laudantium velit! Dolore ipsa recusandae impedit illo? Quis quia rem repellendus q
    </div>
  )
}

export default AiAnalysis