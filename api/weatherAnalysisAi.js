import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res){
  if(req.method !== "POST"){
    return res.status(405).json({error: "Method not allowed"});
  }

  const { weatherData } = req?.body ?? {};
  if( !weatherData ){
    return res.status(405).json({error: "No Weather data for Analysis"});
  }
  
  try{
    
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
          You are a weather analyst.

            Analyze this weather data and return:
            1. Summary
            2. Health advice
            3. Travel advice
            4. Clothing advice
            5. Risk alerts

          Weather data:
          ${JSON.stringify(weatherData)}
          `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return res.status(200).json({
      answer: response.text,
    });
  }catch(error){
    console.error("Gemini error:", error);

    return res.status(500).json({
      error: "AI request failed",
    });
  }
  
}

