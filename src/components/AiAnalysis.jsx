import { getWeatherAnalysis } from "../services/weatherService"
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";


function AiAnalysis() {
  const [res, setRes] = useState(null);
  const [aiError, setAiError] = useState(null);
  const debugFlag = useRef(false);

  const normalizeAnswer = (answer) => {
    if (typeof answer === "string") {
      const trimmed = answer.trim();
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
          return JSON.parse(trimmed);
        } catch {
          return trimmed;
        }
      }
      return trimmed;
    }
    return answer;
  };

  const getAnalysis = async(data)=>{
    let analysisData = null;
    try {
      analysisData = await getWeatherAnalysis(data);
      console.log(analysisData);
    } catch (error) {
      console.error("Weather Analysis Failed", error);
      setAiError(error.message || "Weather analysis failed");
      return;
    }
    debugFlag.current = true;

    if (analysisData?.answer) {
      try {
        let jsonString = analysisData.answer;
        if (typeof jsonString === "string" && jsonString.includes('```json')) {
          jsonString = jsonString.replace(/```json\n?/g,'').replace(/```\n?/g,'');
        }

        let parsed = null;
        if (typeof jsonString === "string") {
          try {
            parsed = JSON.parse(jsonString);
          } catch {
            parsed = null;
          }
        }

        if (parsed) {
          const answerValue = parsed.answer ?? parsed;
          setRes(normalizeAnswer(answerValue));
          return JSON.stringify(parsed, null, 2);
        }

        setRes(normalizeAnswer(jsonString));
        return jsonString;
      } catch (e) {
        setAiError(e.message);
        setRes(analysisData.answer);
        return analysisData.answer;
      }
    }

    setAiError("No answer returned from weather analysis");
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
    <>
    {
      res &&
      <div className={`h-75 container w-full md:w-[40%] `}>
        <div className="box">
          <div className="content overflow-x-hidden overflow-y-auto scrollbar-none">
            <ul
            className="flex flex-col items-start gap-[2px] p-2 ">
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
    }
    </>
  )
}

export default AiAnalysis;

