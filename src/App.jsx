import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import { ErrorPage, CurrWeather, TodaysWeather, WeekWeather, } from './pages'
import Layout from './layout/Layout';
import { useSelector } from 'react-redux';
import './index.css';


function App() {

  const isThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches ?? useSelector((state)=>state.setup.theme) ?? false;  


  
  return (
    // <Routes>
    //   <Route element={<Layout />}>
    //     <Route path="/" index element={<CurrWeather />} />
    //     <Route path="/today" element={<TodaysWeather />} />
    //     <Route path="/week" element={<WeekWeather />} />
    //   </Route>
    // </Routes>
    <Layout />
  )
}

export default App
