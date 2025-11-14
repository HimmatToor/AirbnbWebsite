import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Contributions.css'

function Contributions() {
    const navigate = useNavigate()
    
    const members = [
        {
        name: 'Chaewon Park*',
        role: 'Team Leader | Statistical Modeling',
        contribution:
            'Led the team and coordinated project milestones. Developed the statistical modeling framework, including a random effects model for analyzing Airbnb price variations across cities.',
        skills: 'R, Python, Statistical Modeling',
        },
        {
        name: 'Craig Cultice',
        role: 'Data Analyst | Data Cleaning & Exploratory Analysis',
        contribution:
            'Worked collaboratively on data cleaning and exploratory data analysis (EDA). Processed Airbnb datasets in R, handled missing values, and performed summary visualizations to identify city-level trends.',
        skills: 'R, Python, EDA',
        },
        {
        name: 'Hongrui Zhuang',
        role: 'Data Analyst | Data Cleaning & Exploratory Analysis',
        contribution:
            'Collaborated on the data cleaning and EDA phase, focusing on feature inspection, outlier detection, and variable selection for later modeling. Supported the integration of cleaned datasets for visualization.',
        skills: 'R, Python, EDA',
        },
        {
        name: 'Huijie (Jack) Lai',
        role: 'Machine Learning Developer | Predictive Modeling (XGBoost)',
        contribution:
            'Implemented and optimized the XGBoost model to predict Airbnb prices using key variables such as location, room type, and review scores. Tuned hyperparameters and compared model performance metrics.',
        skills: 'R, Python, XGBoost',
        },
        {
        name: 'Christine Li',
        role: 'Frontend Developer & Designer | Visualization & UI Design',
        contribution:
            'Co-developed the interactive website using React, designed the homepage and contributions page, and created Canva-based visual assets. Focused on layout design, color consistency, and data storytelling visuals.',
        skills: 'R, Python, React, Canva Design',
        },
        {
        name: 'Himmat Toor',
        role: 'Web Developer | Integration & Deployment',
        contribution:
            'Built and deployed the web application using React and GitHub Pages. Managed frontend functionality, routing, and API integration, working closely with Christine to ensure a cohesive and responsive user experience.',
        skills: 'React, Python, Web Deployment',
        },
    ];

    return (
    <div className="team-container">
      <h1>Meet the Team</h1>
      <p className="intro">
        Our capstone project, <strong>Airbnb Price Explorer</strong>, was developed by a team of
        six UC Davis Statistics and Data Science students. Together, we combined our technical and
        creative skills to build an interactive platform visualizing Airbnb price patterns across
        major U.S. cities.
      </p>

      <div className="nav-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/projectReport')}>Project Report</button>
        <button onClick={() => navigate('/inputForm')}>Input Form</button>
      </div>

      <div className="team-grid">
        {members.map((member, index) => (
          <div key={index} className="team-card">
            <h2>{member.name}</h2>
            <h3>{member.role}</h3>
            <p className="desc">{member.contribution}</p>
            <p className="skills">
              <strong>Skills:</strong> {member.skills}
            </p>
          </div>
        ))}
      </div>

      <footer className="footer">
        © 2025 Team 10 — STA160 | UC Davis
      </footer>
    </div>
  )
}

export default Contributions