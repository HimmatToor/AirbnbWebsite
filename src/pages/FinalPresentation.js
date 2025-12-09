import React from "react";
import { useNavigate } from "react-router-dom";
import "./FinalPresentation.css";

function FinalPresentation() {
  const navigate = useNavigate();

  return (
    <div className="presentation-page">
      <div className="top-nav">
        <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
        <button className="nav-btn" onClick={() => navigate("/projectReport")}>Project Report</button>
        <button className="nav-btn" onClick={() => navigate("/cities")}>Explore Cities</button>
        <button className="nav-btn" onClick={() => navigate("/inputForm")}>Try Explorer</button>
        <button className="nav-btn" onClick={() => navigate("/contributions")}>Contributions</button>
      </div>

      <h1 className="presentation-title">Team 10 Final Presentation</h1>
      <h3 className="presentation-subtitle">⭐️Website Demo @ 12:31</h3>

      <video className="presentation-video" controls preload="metadata">
        <source
          src={process.env.PUBLIC_URL + "/assets/Group_10_demo_presentation.mp4"}
          type="video/mp4"
        />
      </video>
    </div>
  );
}

export default FinalPresentation;