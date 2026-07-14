import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res){
  if(req.method !== "POST"){
    return res.status(405).json({error: "Method not allowed"});
  }

  const body = req?.body ?? {};
  const { role, language, weatherData } =  body;

  if( !role || !language || !weatherData ){
    return res.status(405).json({error: "No Weather data for Analysis"});
  }
  
  try{
    
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
          Role:You are an expert weather analyst whose speciality is converting weather data into practical, easy-to-understand advice for ordinary people.
          My Profile:
          role: ${role}.
          language: ${language}.
          
          your job/task: analyze the given data( current, hourly(today's) and daily(a Week's from today)) and provide a analysis for me according to my context( considering who i am) in general language, not in scientific language..do and generate the response such that a non-technical/non-scientific/no-weather-terminologies-knowledge guy gain the weather information without any need to search the things in the response in order to understand it..

          rules: 1. the response should be easy to understand according to who i am( my profile).
          2. Only mention numerical weather values when they directly affect user decisions or safety..
          3. response should be easy to gain necessary information about weather and plan things which i am supposed to do in general.
          4. response should give personalize suggestions/tips/plans/warnings/alerts/ depending on my profile so that i can plan my schedule accordingly. Personalize every recommendation according to the user's role and likely daily routine.
          5. response should be readable.
          6. response should include general alerts/warnings and life threatning alerts(if there any).
          7.Do not use scientific terminology.
          8.Do not mention weather scales, indexes or technical measurements unless they are essential for user safety.
          9.If a technical concept must be mentioned, explain it immediately using everyday language.
          10.Never invent weather events that are not supported by the provided data.
          11. Every recommendation must be directly supported by the weather information provided.
          12. Do not comment on weather attributes that have no practical impact on the user's decisions.
          13. Maximum 250 words response.
          14. When weather conditions are favorable, actively recommend suitable activities instead of only describing the weather.
          15. Prioritize information in this order:
            1. Immediate safety concerns  
            2. Weather changes that affect today's plans
            3. Practical recommendations
            4. Weekly outlook
            Do not spend unnecessary space describing pleasant weather.
          16. If the user's role is "General" or "Default", do not personalize the analysis. Instead, provide practical weather insights and recommendations that are useful for the average person.

          expected response format:
          Return plain text.
          Avoid long paragraphs.
          Use short paragraphs instead of bullet points..
          Do not use markdown tables.
          Do not use emojis.
          Write naturally

          When analyzing weather:
          First understand the overall weather pattern.
          Then identify important changes.
          Then determine which changes actually affect the user.
          Finally convert those findings into practical recommendations.

          remember: Do not repeat obvious weather information.
          Instead focus on insights.
            Bad: "It is raining."
            Good: "Rain is expected to continue through the afternoon, so outdoor plans may be better shifted to the evening."
          Adapt recommendations according to the user's role.
            Example:
              Student: Focus on commuting, classes, walking, sports and study routines.
              Working Professional: Focus on office commute, meetings, driving and productivity.
              Traveler: Focus on sightseeing, transportation and outdoor activities.
              Senior Citizen: Focus on comfort, hydration and health precautions.
              Fitness Enthusiast: Focus on exercise timing and outdoor conditions.


          Your success is measured by whether the user can immediately understand the weather and confidently plan their day without looking at any other weather information.
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
      error: error,
    });
  }
  
}


// your personalities: simply things, make easy for others, help other, intellectual, sharp observation, detailed observer, knowledge extracter and provider, weather enthusiast, extrovert.

//negative prompt: scientific values,  terminologies, scales, hard to interpret, hard to understand, meaningless, hard to interpret, unpersonalized suggestions, unrealted tips, unrelated, suggestions, unrelated warning, unrelated alerts, no general alerts