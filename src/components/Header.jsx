import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { changeCoords, changeLanguage, changeMode, changeTheme, coordsFromCity, coordsFromPin, currentWeather } from '../redux/slices/setupSlice';
import { GiHamburgerMenu, FaLocationDot, MdClear, } from '../data/icons'

function Header({openSidebar}) {
  const { theme, currentWeatherData, coords}= useSelector(state=>state.setup);

  //0->light, 1-> dark
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isMd, setIsMd] =useState(false);
  useEffect(()=>{  //IsMD
    const mediaQuery = window.matchMedia("(min-width: 769px)");

    const handleChange = (event)=>{
      setIsMd(event.matches);
    };

    setIsMd(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return ()=>{
      mediaQuery.removeEventListener('change', handleChange);
    };

  },[]);

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
    if (coords != null) {
      localStorage.setItem('coords', coords);
    }
    
  },[coords, dispatch, ])

  const handleLocation = async (val)=>{
    if(val.toString().length>0) setIsInputEmpty(false);
    setLocation(val.trim());

    try {
      if(Number(val.trim())) {
        const coords = await dispatch(coordsFromPin(Number(val.trim()))).unwrap();
      }else{
        const coords = await dispatch(coordsFromCity(val.trim())).unwrap();
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
    <header className='w-dvw max-h-max flex flex-col justify-evenly items-center gap-1 bg-gradient-to-b from-[#2363BE ] to-white/0' >
      <div className='w-full flex justify-between p-3 
      '>
        {/*Name and LOGO*/}
        <div className='text-white'>
          VYOM
        </div>

        {/* SideBar */}
        <div
        className='flex justify-center items-center text-white'
        onClick={openSidebar}>
          <GiHamburgerMenu
          size={25}/>
        </div>
      </div>

      <div className='w-full h-auto flex items-center justify-between gap-2 px-2 bg-transparent'>
        {/*location*/}
        <div className='w-full h-10 min-w-0 h-10 flex justify-end items-center overflow-hidden flex-nowrap bg-white text-black rounded-2xl'>
          <input type="text"
          placeholder='Enter Location or Pincode'
          value={location===0? '' : location}
          className='outline-none m-0
            h-full w-full px-4 overflow-hidden
            '
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
          className='shrink-0 w-8 h-full flex justify-center items-center'
          >
            <MdClear size={25}
            className='bg-primary'/>
          </button>
          }
        </div>

        {/*Current Location btn*/}
        <div className={`w-fit h-10 bg-primary text-white hover:bg-primary-hover transition-all duration-200 cursor-pointer shrink-0 border-1 border-gray-300 p-2 overflow-hidden flex items-center rounded-2xl
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
      </div>
    </header>
  )
}

export default Header
