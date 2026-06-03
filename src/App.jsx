import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import { ErrorPage, CurrWeather, TodaysWeather, WeekWeather, } from './pages'
import Layout from './layout/Layout';


function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" index element={<CurrWeather />} />
        <Route path="/today" element={<TodaysWeather />} />
        <Route path="/week" element={<WeekWeather />} />
      </Route>
    </Routes>
  )
}

export default App
