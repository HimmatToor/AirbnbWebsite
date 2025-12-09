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
          'Led the team and coordinated project milestones. Developed the Linear Mixed Effects Model (LMM) to analyze city-level Airbnb price variation, incorporating structured random effects to interpret neighborhood-level pricing trends.',
        skills: 'R, Linear Mixed Models',
        },
          {
        name: 'Christine Li',
        role: 'Frontend Developer & ML Developer | UI Design, LSRT Model, Interactive Maps',
        contribution:
          'Co-developed the interactive website using React, including the homepage, input form, contributions page, and model-selection interface. Built the LSRT Recurrent Neural Network Model for sequential price prediction using time-stamped Airbnb snapshots. Designed and implemented interactive Leaflet maps for all five cities. Created consistent UI styling and Canva-based graphic assets.',
        skills: 'R, Python, React, LSTM/LSRT, Leaflet Maps, UI/UX Design',
        },
        {
        name: 'Craig Cultice',
        role: 'Data Analyst | Data Processing & Exploratory Analysis',
        contribution:
          'Acquired and assembled the historical Airbnb datasets by downloading archived monthly files and merging them into unified city-level data frames. Cleaned the datasets by removing extraneous features and assessing missingness patterns across variables. Supported the modeling phase by preparing structured CSV exports and contributing to the interpretation of exploratory visualizations.',
        skills: 'R, Data Cleaning, EDA',
        },
        {
          name: 'Himmat Toor',
          role: 'Web Developer | Integration, Deployment & Model Implementation',
          contribution:
            'Developed and deployed the web application using React and GitHub Pages. Implemented the predictive models (XGBoost and LSRT) on the webpage by connecting frontend components with backend API endpoints, ensuring smooth browser-to-model communication. Managed routing, responsiveness, and frontend–backend integration to support real-time predictions.',
          skills: 'React, Python, Web Deployment, API Integration',
        },
        {
        name: 'Hongrui Zhuang',
        role: 'Data Analyst | Exploratory Analysis & Feature Preparation',
        contribution:
          'Preprocessed price-related variables through filtering and type standardization to ensure model compatibility. Generated a comprehensive suite of exploratory visualizations, including distributional plots, heatmaps, correlation matrices, and summary statistics, to characterize city-level Airbnb pricing behavior. Interpreted these analyses to guide feature selection and improve downstream modeling decisions.',
        skills: 'R, Visualization, EDA',
      },
        {
        name: 'Huijie (Jack) Lai',
        role: 'Machine Learning Developer | Predictive Modeling (XGBoost)',
        contribution:
            'Implemented and optimized the XGBoost model to predict Airbnb prices using key variables such as location, room type, and review scores. Tuned hyperparameters and compared model performance metrics.',
        skills: 'R, XGBoost',
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
        <button onClick={() => navigate('/finalPresentation')}>Final Presentation</button>
        <button onClick={() => navigate('/cities')}>Explore Cities</button>
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