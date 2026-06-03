import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {

  const navElements = [
    {name: "Current Weather",
      to : '/',
    },
    {name: "Todays Forecast",
      to : '/today',
    },
    {name: "Week's Forecast",
      to : '/week',
    },
  ]

  return (

    <div className='w-full h-[8%] backfrop-opacity-0 flex justify-center items-center border-none bg-tranparent outline-none z-50'>
      <nav className='bg-white w-5/6  h-full flex justify-evenly'>
      {
        navElements.map(element=>
          <NavLink to={element.to} className={({ isActive }) =>
          `size-auto border-1 m-0 flex-1 flex justify-center items-center
          ${
            isActive
            ?'bg-gray-300'
            :''
          }`}

          key={element.name}>
            <p className=''>{element.name}</p>
          </NavLink>
        )
      }
      </nav>
    </div>
  )
}

export default Navbar