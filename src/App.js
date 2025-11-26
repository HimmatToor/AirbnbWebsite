import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import ProjectReport from './pages/ProjectReport'
import InputForm from './pages/InputForm'
import Contributions from './pages/Contributions'
import Cities from './pages/Cities'
import NY from "./pages/cities/NY"

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/projectReport" element = {<ProjectReport />} />
          <Route path="/cities" element={<Cities />} />
          <Route path = "/inputForm" element = {<InputForm />} />
          <Route path = "/contributions" element = {<Contributions />} />
          <Route path="/city/ny" element={<NY />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App