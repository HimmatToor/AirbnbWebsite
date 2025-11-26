import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './Home.css';

function Home() {
  const [scrollY, setScrollY] = useState(0);

  const navigate = useNavigate();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Limit the blur and darkness intensity
  const blurAmount = Math.min(scrollY / 100, 5);       // max 5px blur
  const darkenOpacity = Math.min(scrollY / 400, 0.5);  // max 0.5 overlay

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/background.png'})`,
        filter: `blur(${blurAmount}px)`,
      }}
    >
      {/* Dark overlay that becomes darker as you scroll */}
      <div
        className="overlay"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${0.35 + darkenOpacity})`,
        }}
      ></div>

      <div className="hero-text">
        <h1>Airbnb Price Explorer</h1>
        <p>Visualizing travel affordability across 5 U.S. cities.</p>
        <p>Come explore our interactive dashboard & uncover data-driven insights!</p>

        <div className="home-buttons">
          <button onClick={() => {navigate("/projectReport")}} className="home-btn">View Project</button>
          <button onClick={() => {navigate("/cities")}} className="home-btn">Explore Cities</button>
          <button onClick={() => {navigate("/inputForm")}} className="home-btn">Try Explorer</button>
          <button onClick={() => {navigate("/contributions")}} className="home-btn">Meet the Team</button>
        </div>
      </div>

      <footer className="footer">
        © 2025 Team 10 — STA160 | UC Davis
      </footer>
    </div>
  );
}

export default Home;