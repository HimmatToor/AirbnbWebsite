import React, {useState, useEffect} from 'react'
import {HashRouter as Router, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import ProjectReport from './pages/ProjectReport'
import InputForm from './pages/InputForm'
import Contributions from './pages/Contributions'
import Cities from './pages/Cities'
import NY from "./pages/cities/NY"
import DAL from "./pages/cities/DAL"
import DEN from "./pages/cities/DEN"
import CHI from "./pages/cities/CHI"
import LA from "./pages/cities/LA"
import XGBoostForm from "./pages/XGBoostForm"
import LSRTForm from "./pages/LSRTForm"


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/projectReport" element = {<ProjectReport />} />
          <Route path="/cities" element={<Cities />} />
          <Route path = "/inputForm" element = {<InputForm />} />
          <Route path ="/xgboostForm" element={<XGBoostForm />} />
          <Route path ="/lsrtForm" element={<LSRTForm />} />
          <Route path = "/contributions" element = {<Contributions />} />
          <Route path="/city/ny" element={<NY />} />
          <Route path="/city/dallas" element={<DAL />} />
          <Route path="/city/denver" element={<DEN />} />
          <Route path="/city/chicago" element={<CHI />} />
          <Route path="/city/la" element={<LA />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App