import { getWeatherAnalysis } from "../services/weatherService"


function AiAnalysis({data, loading, error, hasCoords}) {

  const analysisData = getWeatherAnalysis(data);
  console.log(analysisData);
  
  return (
    <div></div>
  )
}

export default AiAnalysis