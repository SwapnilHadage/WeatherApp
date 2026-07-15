import { Language } from "@google/genai";
import { getWeatherAnalysis } from "../services/weatherService"
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import './ai.css';

function AiAnalysis() {
  const [res, setRes] = useState(null);
  let debugFlag = useRef(false);
  const getAnalysis = async(data)=>{
    try {
      const analysisData = await getWeatherAnalysis(data);
      console.log(analysisData);
    } catch (error) {
      console.error("Weather Analysis Failed", error);
    }
    debugFlag.current = true;
  }
  const { loading, error, currentWeatherData, todaysWeatherData, weekWeatherData, coords, language, } = useSelector(state=>state.setup);


  useEffect( ()=>{
    let data = null;
    if( !debugFlag.current &&
      coords &&
      !error &&
      !loading &&
      currentWeatherData &&
      todaysWeatherData &&
      weekWeatherData){
      data = getAnalysis({
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
  const displayText =
    res?.text ||
    res?.message ||
    (typeof res === "string" ? res : JSON.stringify(res, null, 2));

  return (
    <div
    className=" container
    ">
      <div className="box">
        <div className="content"
        >
            <h1>{displayText}</h1>
        </div>
      </div>
    </div>
  )
}

export default AiAnalysis;

