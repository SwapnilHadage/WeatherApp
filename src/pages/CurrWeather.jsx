import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CurrWeatherHero, CurrWeatherSideHero, AiAnalysis } from '../components';
import { currentWeather, weekWeather, todayWeather } from '../redux/slices/setupSlice';

function CurrWeather() {

  const dispatch = useDispatch();
  const { coords, currentWeatherData, loading, error } = useSelector(state=>state.setup);

  useEffect(()=>{
    if(coords){
      dispatch(currentWeather(coords));
      dispatch(todayWeather(coords));
      dispatch(weekWeather(coords));
    }
  },[coords, dispatch]);

  const [isMd, setIsMd] =useState(false);
    useEffect(()=>{  //IsMD
      const mediaQuery = window.matchMedia("(min-width: 769px)");
  
      const handleChange = (event)=>{
        setIsMd(event.matches);
      };
  
      setIsMd(mediaQuery.matches);
      console.log(mediaQuery.matches);
      
      mediaQuery.addEventListener('change', handleChange);
  
      return ()=>{
        mediaQuery.removeEventListener('change', handleChange);
      };
    }, []);

  return (
    <div className={`size-full relative flex ${isMd ? 'flex-col' : 'flex-col'}  shrink-0 p-1 py-2 md:items-start 
    `}>
      {
        isMd &&
        currentWeatherData &&
        <>
          <div
          className='flex-1 relative flex gap-3 w-full
          md:items-start'>
            <CurrWeatherHero
              data = {currentWeatherData}
              loading = {loading}
              error = {error}
              hasCoords = {Boolean(coords)}/>

            <AiAnalysis />
          </div>
          <div
          className=' '>
            <CurrWeatherSideHero
              data = {currentWeatherData}
              loading = {loading}
              error = {error}
              hasCoords = {Boolean(coords)}/>
          </div>
        </>


      }
      { !isMd &&
        currentWeatherData &&

        <>
        <CurrWeatherHero
        data = {currentWeatherData}
        loading = {loading}
        error = {error}
        hasCoords = {Boolean(coords)}/>

        <CurrWeatherSideHero
        data = {currentWeatherData}
        loading = {loading}
        error = {error}
        hasCoords = {Boolean(coords)}/>

        <AiAnalysis data={currentWeatherData}/>
        </>
      }

    </div>
  )
}

export default CurrWeather