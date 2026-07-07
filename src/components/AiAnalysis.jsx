import { useEffect } from "react"
import { getWeatherAnalysis } from "../services/weatherService"


function AiAnalysis({data, loading, error, hasCoords}) {
  const getAnalysis = async()=>{
    try {
      const analysisData = await getWeatherAnalysis(data);
      console.log(analysisData);
    } catch (error) {
      console.error("Weather Analysis Failed", error);
    }
  }
  useEffect(()=>{
    if(data){
      getAnalysis();
    }
  }, [data])
  
  return (
    <div></div>
  )
}

export default AiAnalysis