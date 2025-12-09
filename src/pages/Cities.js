import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Cities.css'

function Cities() {
    const navigate = useNavigate()

    return (
        <div className="cities-container">
            <h1 className="cities-title">Explore Cities</h1>
            <p className="cities-subtitle">Select your destination city to view Airbnb listings!</p>

            {/* NAVIGATION BAR */}
            <div className="navbar">
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/projectReport")}>Project Report</button>
                <button onClick={() => navigate("/finalPresentation")}>Final Presentation</button>
                <button onClick={() => navigate("/inputForm")}>Input Form</button>
                <button onClick={() => navigate("/contributions")}>Contributions</button>
            </div>

            {/* CITY CARD GRID */}
            <div className="city-grid">

                <div className="city-card" onClick={() => navigate("/city/ny")}>
                    <img src={`${process.env.PUBLIC_URL}/assets/NY.png`} alt="New York City" className="city-img" />
                    <h3>New York City</h3>
                </div>

                <div className="city-card" onClick={() => navigate("/city/dallas")}>
                    <img src={`${process.env.PUBLIC_URL}/assets/DAL.png`} alt="Dallas" className="city-img" />
                    <h3>Dallas</h3>
                </div>

                <div className="city-card" onClick={() => navigate("/city/denver")}>
                    <img src={`${process.env.PUBLIC_URL}/assets/DEN.png`} alt="Denver" className="city-img" />
                    <h3>Denver</h3>
                </div>

                <div className="city-card" onClick={() => navigate("/city/chicago")}>
                    <img src={`${process.env.PUBLIC_URL}/assets/CHI.png`} alt="Chicago" className="city-img" />
                    <h3>Chicago</h3>
                </div>

                <div className="city-card" onClick={() => navigate("/city/la")}>
                    <img src={`${process.env.PUBLIC_URL}/assets/LA.png`} alt="Los Angeles" className="city-img" />
                    <h3>Los Angeles</h3>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="footer">
                <p>© 2024 Team 10 – STA160 Airbnb Explorer</p>
            </footer>
        </div>
    )
}

export default Cities