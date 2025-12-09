import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./InputForm.css";

function InputForm() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="input-form-container">

                <h2>Select a Prediction Model</h2>
                <p className="model-intro">
                    Each model uses different input features. Choose the one that matches the
                    information you can provide.
                </p>

                {/* Navigation */}
                <div className="nav-buttons">
                    <button onClick={() => navigate("/")}>Home</button>
                    <button onClick={() => navigate("/projectReport")}>Project Report</button>
                    <button onClick={() => navigate("/finalPresentation")}>Final Presentation</button>
                    <button onClick={() => navigate('/cities')}>Explore Cities</button>
                    <button onClick={() => navigate("/contributions")}>Contributions</button>
                </div>

                <div className="model-selection-container">

                    {/* XGBoost Card */}
                    <div className="model-card">
                        <h3>XGBoost Model</h3>
                        <p>
                            Uses key details about each Airbnb listing, such as the <b>number of beds, bedrooms, reviews, availability, and host information</b>, to estimate a fair price for the stay.
                        </p>
                        <button className="model-btn" onClick={() => navigate("/xgboostForm")}>
                            Use XGBoost Model
                        </button>
                    </div>

                    {/* LSRT Card */}
                    <div className="model-card">
                        <h3>LSTM Recurrent Neural Network Model (LSRT)</h3>
                        <p>
                            Uses the <b>amenities you select, seasonal patterns, and listing details</b> to predict price while also capturing how Airbnb prices change across different times of the year.
                        </p>
                        <button className="model-btn" onClick={() => navigate("/lsrtForm")}>
                            Use LSRT Model
                        </button>
                    </div>

                </div>

                
                </div>
            <footer className="footer">
                <p>© 2025 Team 10 — STA160 | UC Davis</p>
            </footer>
        </div>
    );
}

export default InputForm
