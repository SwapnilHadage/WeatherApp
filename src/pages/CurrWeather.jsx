import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CurrWeatherHero, CurrWeatherSideHero, AiAnalysis } from '../components';
import { currentWeather } from '../redux/slices/setupSlice';

function CurrWeather() {

  const dispatch = useDispatch();
  const { coords, currentWeatherData, loading, error } = useSelector(state=>state.setup);

  useEffect(()=>{
    if(coords){
      dispatch(currentWeather(coords));
    }
  },[coords, dispatch]);

  return (
    <div className='size-full relative flex flex-col justify-evenly items-center
    '>
      <div className='flex justify-center items-center w-full h-full md:justify-start p-4'>
        <CurrWeatherHero
        data = {currentWeatherData}
        loading = {loading}
        error = {error}
        hasCoords = {Boolean(coords)}/>
      </div>
      <CurrWeatherSideHero
        data = {currentWeatherData}
        loading = {loading}
        error = {error}
        hasCoords = {Boolean(coords)}/>
      {
        currentWeatherData &&
        <AiAnalysis data={currentWeatherData}/>
      }
    </div>
  )
}

export default CurrWeather