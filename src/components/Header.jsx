import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { changeCoords, changeLanguage, changeMode, changeTheme, coordsFromCity, coordsFromPin, currentWeather } from '../redux/slices/setupSlice';
import { FaLocationDot } from "react-icons/fa6";


function Header() {
  const {language, mode, theme, currentWeatherData, coords}= useSelector(state=>state.setup);

  //0->light, 1-> dark
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  let oldLocation = null;
  oldLocation = useSelector(state => state.setup.coords) || localStorage.getItem('coords');
  if (oldLocation?.type != 'string') {
    oldLocation = '';
  }

  const [location, setLocation] = useState(oldLocation || '');
  const dispatch = useDispatch();

  function getCurrentLocation(){

    if(!navigator.geolocation){
      alert("Geolocation not supported, Try different Browser!");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        dispatch(changeCoords({lat,lon}));
      },(error)=>{
        if (error.code===1) {
          alert("Location Permission Denied!!");
        }else{
          alert("Unable to access Location");
        }
      }
      );
    };

  useEffect(()=>{
    console.log('coords: ', coords);
    // const fetchAPI=async()=> {
    //   await dispatch(currentWeather(coords)).unwrap()
    // }

    if (coords != null) {
      // fetchAPI();
      localStorage.setItem('coords', coords);
    }
    
  },[coords, dispatch, ])


  const languages = ['English', 'Hindi', 'Marathi',];
  const modes = ['student', 'traveler', 'Professional',];

  const handleModeChange = (val)=>{
    dispatch(changeMode(val));
  }
  const handleLanguageChange = (val)=>{
    dispatch(changeLanguage(val.trim()));
  }
  const handleThemeChange = (val)=>{
    dispatch(changeTheme());
  }
  const handleLocation = async (val)=>{
    if(val.toString().length>0) setIsInputEmpty(false);
    setLocation(val.trim());

    try {
      if(Number(val.trim())) {
        const coords = await dispatch(coordsFromPin(Number(val.trim()))).unwrap();
        //await dispatch(currentWeather(coords));
        console.log('pin', coords);
        
      }else{
        const coords = await dispatch(coordsFromCity(val.trim())).unwrap();
        //await dispatch(currentWeather(coords));
        console.log('city', coords);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error.message || error);
    }
  }
  const clearSearch=()=>{
    setLocation('');
    setIsInputEmpty(true)
  }
  const trackInput =(val)=>{
    if(val.length>0){
      setIsInputEmpty(false)
    }else{
      setIsInputEmpty(true);
    }
  }

  return (
    <header className='w-full max-h-max bg-gray-200 flex justify-evenly items-center flex-row px-2 py-4' >
      {/*language*/}
      <div className=' border-2 border-gray-300 p-2'>
        <select name="language" id="" className='outline-none'
        onChange={(e)=> {
          handleLanguageChange(e.target.value)
          }}>
        { languages.map((lang, i) => {
          return(
            <option value={lang} key={i}>
              {lang}
            </option>
          )
          })}
        </select>
      </div>

      {/*location*/}
      <div className='w-full flex-1 min-w-0 max-w-[50%] p-0 border-2 border-gray-300 bg-white flex justify-end overflow-hidden flex-nowrap'>
        <input type="text"
        placeholder='Enter Location or Pincode'
        value={location===0? '' : location}
        className='outline-none m-0
          p-2 flex-1 bg-white'
        onKeyDown={
          (e)=>{
            if(e.key === "Enter") {
              handleLocation(e.target.value);
            }
          }
        }
        onChange={
          (e)=>{
            trackInput(e.target.value)
            setLocation(e.target.value)
        }}
        />
        {!isInputEmpty &&
          <button onClick={clearSearch}
        className='shrink-0 w-10 bg-gray-200'
        >x</button>
        }
      </div>

      {/*Current Location btn*/}
      <div className='border-2 border-gray-300 p-2 overflow-hidden min-w-[20%] flex items-center gap-1'>
        <FaLocationDot />
        <button
        className=''
        onClick={getCurrentLocation}
        > Use Current Location</button>
      </div>

      {/*modes*/}
      <div className=' w-fit shrink-0 border-2 border-gray-300 p-2 overflow-hidden'>
        <select name="modes" id="" className='border-none outline-none w-auto'
        onChange={(e)=>{
          handleModeChange(e.target.value)
        }}>
          {modes.map((mode,i) => {
            return(
              <option value={mode.toUpperCase()} key={i}>
                {mode}
              </option>
            )
          })}
        </select>
      </div>
    
      {/* theme
      <div className='w-20 h-auto border-2 border-gray-300 p-2'>
        Dark/Light
      </div> */}
    </header>
  )
}

export default Header
