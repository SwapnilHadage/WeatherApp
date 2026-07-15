import { Language } from "@google/genai";
import { getWeatherAnalysis } from "../services/weatherService"
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import './ai.css';

function AiAnalysis() {
  const [res, setRes] = useState(null);
  const [aiError, setAiError] = useState(null);
  let debugFlag = useRef(false);

  const getAnalysis = async(data)=>{
    let analysisData = null;
    try {
      analysisData = await getWeatherAnalysis(data);
      console.log(analysisData);
    } catch (error) {
      console.error("Weather Analysis Failed", error);
    }
  debugFlag.current = true;

  if(analysisData.answer){
    try{
      let jsonString = analysisData;
      if(jsonString.includes('```json')){
        jsonString = jsonString.replace(/```json\n?/g,'').replace(/```\n?/g,'')
      }
      const parsed = JSON.parse(jsonString);
      if(parsed.answer && typeof parsed?.answer==='object'){
          return parsed.answer;
      }
      return JSON.stringify(parsed, null, 2);
    }catch(e){
      setAiError(e.message);
      return analysisData.answer;
    }
  }

  return res?.text ||
    res?.message ||
    (typeof res === "string" ? res : JSON.stringify(res, null, 2));
  
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
    ]);

  return (
    <div className="container">
      <div className="box">
        <div className="content">
            <h1>{res}</h1>
        </div>
      </div>
    </div>
  )
}

export default AiAnalysis;

