import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CurrWeatherHero, CurrWeatherSideHero } from '../components';
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
    <div className='size-full relative flex flex-col justify-center pb-10 gap-5'>
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
    </div>
  )
}

export default CurrWeather