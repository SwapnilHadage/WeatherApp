import { Language } from "@google/genai";
import { getWeatherAnalysis } from "../services/weatherService"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './ai.css';

function AiAnalysis() {
  const [res, setRes] = useState(null);
  let debugFlag = false;
  const getAnalysis = async(data)=>{
    try {
      const analysisData = await getWeatherAnalysis(data);
      console.log(analysisData);
    } catch (error) {
      console.error("Weather Analysis Failed", error);
    }
    debugFlag = true;
  }
  const { loading, error, currentWeatherData, todaysWeatherData, weekWeatherData, coords, language, } = useSelector(state=>state.setup);


  useEffect(()=>{
    if( !debugFlag &&
      coords &&
      !error &&
      !loading &&
      currentWeatherData &&
      todaysWeatherData &&
      weekWeatherData){
      const data = getAnalysis({
        role: 'general',
        language,
        weatherData: {
          currentWeatherData,
          todaysWeatherData,
          weekWeatherData,
        }
      });
    }

    setRes(data);
  },[
      currentWeatherData,
      todaysWeatherData,
      weekWeatherData,
    ])
  
  return (
    <div
    className=" container
    ">
      <div className="box">
        <div className="content"
        >
          <h1>
            {res}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default AiAnalysis;

