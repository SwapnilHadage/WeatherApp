import { useEffect, useState, useRef, useReducer, } from 'react'
import { Header, Navbar,} from '../components'
import { ErrorPage, CurrWeather, WeekWeather, TodaysWeather, } from '../pages'
import { useSelector, useDispatch } from 'react-redux';
import {Sidebar, } from '../components';
import { useInView, } from 'react-intersection-observer';
import { setTheme } from '../redux/slices/setupSlice';
import WeatherIcon from '../components/weatherIcons/WeatherIcon';

function Layout() {
  const [sidebar, setSidebar] = useState(false);
  const [nav, setNav] = useState(null);
  const  {error, theme} = useSelector(state=>state.setup);
  const [mainRef,setMainRef] = useState(null);
  const [systemPrefersDark, setSystemPrefersDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const dispatch = useDispatch();

useEffect(() => {
  dispatch(setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'));
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e) =>{
    setSystemPrefersDark(e.matches);
    dispatch(setTheme(e.matches ? 'dark' : 'light'));
  }
  mql.addEventListener("change", handler);
  
  return () => mql.removeEventListener("change", handler);
}, []);


  const { ref: todayWeatherRef, inView:isTodayWeatherInView } = useInView({
    threshold: 0.3,
    root: mainRef,
  });
  const { ref: currWeatherRef, inView: isCurrWeatherInView } = useInView({
    threshold: 0.3,
    root: mainRef,
  });

  useEffect(()=>{
    if(!mainRef) return;

    const handleScroll = ()=>{
      const isAtBottom = mainRef.scrollTop + mainRef.clientHeight >= mainRef.scrollHeight -2;
      const isNearTop = mainRef.scrollTop +90 >= weekWeatherScrollRef.current.offsetTop ;
      if(isAtBottom || isNearTop){
        setNav('weekWeather');
      }else if(isTodayWeatherInView){
        setNav('todayWeather');
      }else if(isCurrWeatherInView){
        setNav('currWeather');
      }
    };

    mainRef.addEventListener("scroll", handleScroll);

    handleScroll();

    return ()=>{
      mainRef.removeEventListener("scroll", handleScroll);
    }

  },[isTodayWeatherInView, isCurrWeatherInView, mainRef]);

  const openSidebar = ()=> setSidebar(true);
  const closeSidebar = ()=> setSidebar(false);

  const currWeatherScrollRef = useRef(null);
  const todayWeatherScrollRef = useRef(null);
  const weekWeatherScrollRef = useRef(null);

  function scrollIntoView(div){
    
    let section;
    if(div.trim()==='Current'){
      mainRef.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;

    }else if(div===`Today's`){
      section = todayWeatherScrollRef.current;
    }else{
      section = weekWeatherScrollRef.current;
    }

    if(!mainRef && !section){
      return;
    }

  
    let top;
    if(section.offsetHeight > mainRef.clientHeight){
      top = section.offsetTop - mainRef.offsetTop ;
    }else{
      top = section.offsetTop - (mainRef.clientHeight - section.clientHeight)/2;
    }

    mainRef.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  };
  
  return (
    <div className={` w-screen h-screen flex flex-col bg-[url('weatherPics/bg3.png')] bg-cover bg-center bg-no-repeat text-text overflow-hidden  relative
    ${theme==='light' ? 'dark' : 'light'}`}>
      <Header
      openSidebar={openSidebar}/>
        <main className='flex flex-1 w-full justify-center items-start overflow-x-hidden overflow-y-auto scrollbar-none p-2
        md:pb-10'
        ref={setMainRef}>
          {
            error ? <ErrorPage error={error}/> :
            <div className='w-full flex flex-col gap-6 
            '>
              <div ref={(element) => {
                  currWeatherRef(element);
                  currWeatherScrollRef.current = element;
                }}
              >
                <CurrWeather />
              </div>
              <hr />
              <div ref={(element) => {
                  todayWeatherRef(element);
                  todayWeatherScrollRef.current = element;
                }}>
                <TodaysWeather />
              </div>
              <hr />
              
              <div ref={(element) => {
                  weekWeatherScrollRef.current = element;
                }}>
                <WeekWeather />
              </div>
            </div>
          }
          <Navbar isInView={nav}
          scroll={scrollIntoView}
          />
        </main>
      
      {
        sidebar &&
        <Sidebar
        onClose={closeSidebar}/>
      }
    </div>
  )
}

export default Layout