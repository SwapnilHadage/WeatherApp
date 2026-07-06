import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { changeCoords, changeLanguage, changeMode, changeTheme, coordsFromCity, coordsFromPin, currentWeather } from '../redux/slices/setupSlice';
import { FaLocationDot } from "react-icons/fa6";


function Header({openSidebar}) {
  const { theme, currentWeatherData, coords}= useSelector(state=>state.setup);

  //0->light, 1-> dark
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isMd, setIsMd] =useState(false);
  useEffect(()=>{  //IsMD
    const mediaQuery = window.matchMedia("(min-width: 769px)");
    console.log(isMd);
    const handleChange = (event)=>{
      const isTrue = Boolean(event.matches);
      setIsMd(isTrue);
      console.log(" match: ", isTrue, event.matches, isMd);
      
      console.log(isMd);
      
    };

    setIsMd(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return ()=>{
      mediaQuery.removeEventListener('change', handleChange);
    };
  },[]);

  useEffect(()=>{
    console.log(isMd);
    
  }, [isMd]);

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
      {/*Name and LOGO*/}
      <div>
        VYOM
      </div>

      <div
      onClick={openSidebar}>
        sidebar
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
      <div className={`w-fit shrink-0 border-2 border-gray-300 p-2 overflow-hidden flex items-center
        `}
        onClick={getCurrentLocation}>
        <FaLocationDot />
        {
          isMd &&
          <button
          className=''
          >
            Use Current Location
          </button>
        }
      </div>
    </header>
  )
}

export default Header
