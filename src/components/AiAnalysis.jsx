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
      let jsonString = analysisData.answer;
      if(jsonString.includes('```json')){
        jsonString = jsonString.replace(/```json\n?/g,'').replace(/```\n?/g,'')
      }
      const parsed = JSON.parse(jsonString);
      if(parsed.answer && typeof parsed?.answer==='object'){
        console.log(parsed.answer);
        setRes(parsed.answer);
      }
      return JSON.stringify(parsed, null, 2);
    }catch(e){
      setAiError(e.message);
      return analysisData?.answer;
    }
  }

  return res?.text ||
    res?.message ||
    (typeof res === "string" ? res : JSON.stringify(res, null, 2));
  }


  const { loading, error, currentWeatherData, todaysWeatherData, weekWeatherData, coords, language, } = useSelector(state=>state.setup);
  useEffect( ()=>{

    if( !debugFlag.current &&
      coords &&
      !error &&
      !loading &&
      currentWeatherData &&
      todaysWeatherData &&
      weekWeatherData
      ){

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
    ]);

  return (
    <div className="container">
      <div className="box">
        <div className="content">
          <ul
          className="flex flex-col items-start">
            {
              res &&
              Object.entries(res).map(([Key, value])=>{
                return(
                <li
                key={Key}>
                  {value}
                </li>
              )
            })
          }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AiAnalysis;

