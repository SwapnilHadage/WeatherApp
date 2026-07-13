import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from "motion/react";

function Navbar({isInView, scroll}) {
  console.log(isInView);
  
  const navElements = [
    {
      name: "Current",
      to: '/',
      isActive: isInView==='currWeather',
      class: '',
    },
    {
      name: "Today's",
      to: '/today',
      isActive: isInView==='todayWeather',
      class: 'left-[50%]',
    },
    {
      name: "Week's",
      to: '/week',
      isActive: isInView==='weekWeather',
      class: 'left-[100%]',
    },
  ];


  return (

    <div className='w-full h-[8%] flex justify-center items-center outline-none z-10 absolute bottom-2'>
      <nav className=' w-[90%] h-full flex justify-evenly items-start text-white px-1 gap-1 rounded-3xl bg-black/80 backdrop-blur-xs 
      md:w-[60%] relative '>
        {
          navElements.map(element =>
            <div
            className={
              `relative size-full m-0 flex-1 flex flex-wrap justify-center items-center cursor-pointer  hover:bg-tab-hover' } `}
              key={element.name.trim()}
              onClick={()=>{
                if(!element.isActive){
                  scroll(element.name)
                  
                }
              }}
              >
                {
                  element.isActive && (
                    <motion.div 
                    layoutId='slider'
                    className='absolute inset-0 glass-btn rounded-3xl h-[85%] top-1/2 -translate-y-1/2 '
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                    }}
                    />
                  )
                }
              <p className=''>{element.name.trim()}</p>
            </div>
          )
        }

        {/* glass Slider
        {
          <motion.div
          layoutId='slider'
          className={`absolute w-1/3 h-[85%] top-1/2 -translate-y-1/2 glass-btn  rounded-3xl cursor-pointer `}
          />
        } */}
      </nav>
    </div>
  )
}

export default Navbar