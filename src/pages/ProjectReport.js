import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectReport.css";

function ProjectReport() {
    const navigate = useNavigate();

    return (
        <div className="report-page">

            {/* TOP NAV BUTTONS */}
            <div className="top-nav">
                <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
                <button className="nav-btn" onClick={() => navigate("/cities")}>Explore Cities</button>
                <button className="nav-btn" onClick={() => navigate("/inputForm")}>Input Form</button>
                <button className="nav-btn" onClick={() => navigate("/contributions")}>Contributions</button>
            </div>

            <h1 className="report-title">Project Report</h1>

            {/* EMBED PDF */}
            <div className="pdf-container">
                <iframe
                    src="/assets/Team10_ProjectReport_STA160.pdf"
                    title="Team 10 Project Report"
                    className="pdf-frame"
                />
            </div>

            {/* FOOTER */}
            <footer className="footer">
                <p>© 2025 Team 10 — Airbnb Price Explorer</p>
            </footer>

        </div>
    );
}

export default ProjectReport