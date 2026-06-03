import React from 'react'
import { Header, Navbar,} from '../components'
import { ErrorPage } from '../pages'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Layout() {
  const  error = useSelector(state=>state.setup.error)
  return (
    <div className=' w-screen h-screen flex flex-col bg-white overflow-hidden pb-5'>
      <Header/>
        <main className='flex flex-1 min-h-0'>
          {
            error ? <ErrorPage error={error}/> : <Outlet/>
          }
        </main>
      <Navbar/>
    </div>
  )
}

export default Layout