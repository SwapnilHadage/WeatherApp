import { useState } from 'react'
import { Header, Navbar,} from '../components'
import { ErrorPage } from '../pages'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {Sidebar, } from '../components';

function Layout() {
  const [sidebar, setSidebar] = useState(false);
  const openSidebar = ()=> setSidebar(true);
  const closeSidebar = ()=> setSidebar(false);

  const  error = useSelector(state=>state.setup.error);
  return (
    <div className={` w-screen h-screen flex flex-col bg-white overflow-hidden pb-5 relative 
    `}>
      <Header
      openSidebar={openSidebar}/>
        <main className='flex flex-1 justify-center items-center min-h-0 '>
          {
            error ? <ErrorPage error={error}/> : <Outlet/>
          }
        </main>
      <Navbar/>

      {
        sidebar &&
        <Sidebar
        onClose={closeSidebar}/>
      }
    </div>
  )
}

export default Layout