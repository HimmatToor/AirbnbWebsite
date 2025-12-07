import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "./InputForm.css";

function XGBoostForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        city: "",
        accommodates: "",
        bedrooms: "",
        beds: "",
        room_type: "",
        host_is_superhost: "",
        minimum_nights: "",
        availability_365: "",
        number_of_reviews: "",
        review_scores_rating: "",
        review_scores_checkin: "",
        review_scores_accuracy: ""
    });

    const [error, setError] = useState("");
    const [prediction, setPrediction] = useState(null);

    // ⭐ For auto-scroll
    const predictionRef = useRef(null);

    useEffect(() => {
        if (prediction !== null && predictionRef.current) {
            predictionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [prediction]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    // Room type options
    const getRoomTypeOptions = () => (
        <>
            <option value="Entire home/apt">Entire home/apt</option>
            <option value="Private room">Private room</option>
            <option value="Hotel room">Hotel room</option>
            <option value="Shared room">Shared room</option>
        </>
    );

    // Validation
    const validateForm = () => {
        const mustBeAtLeast1 = [
            "accommodates",
            "bedrooms",
            "beds",
            "minimum_nights",
            "availability_365",
            "number_of_reviews"
        ];

        for (let field of mustBeAtLeast1) {
            if (Number(formData[field]) < 1) {
                return `${field.replace(/_/g, " ")} must be at least 1.`;
            }
        }

        const reviewFields = [
            "review_scores_rating",
            "review_scores_checkin",
            "review_scores_accuracy"
        ];

        for (let field of reviewFields) {
            const val = Number(formData[field]);
            if (val < 1 || val > 5) {
                return `${field.replace(/_/g, " ")} must be between 1 and 5.`;
            }
        }

        if (!["TRUE", "FALSE"].includes(formData.host_is_superhost)) {
            return "Superhost must be TRUE or FALSE.";
        }

        return null;
    };

    // ⭐ Reset Form
    const handleReset = () => {
        setFormData({
            city: "",
            accommodates: "",
            bedrooms: "",
            beds: "",
            room_type: "",
            host_is_superhost: "",
            minimum_nights: "",
            availability_365: "",
            number_of_reviews: "",
            review_scores_rating: "",
            review_scores_checkin: "",
            review_scores_accuracy: ""
        });

        setError("");
        setPrediction(null);
    };

    // Submit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await fetch("https://deploybackend-964220208800.us-west2.run.app/predict_XGB", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("XGB Prediction:", data);

            setPrediction(data.prediction);

        } catch (err) {
            console.error(err);
            setError("Backend error. Please try again.");
        }
    };

    return (
        <div>
            <div className="input-form-container">

                {/* 🔙 Back Button */}
                <div className="ny-topbar">
                    <button className="back-button" onClick={() => navigate("/inputForm")}>
                        ← Back
                    </button>
                </div>

                <h2>XGBoost Price Prediction</h2>

                {/* Navigation Bar */}
                <div className="nav-buttons">
                    <button onClick={() => navigate("/")}>Home</button>
                    <button onClick={() => navigate("/projectReport")}>Project Report</button>
                    <button onClick={() => navigate('/cities')}>Explore Cities</button>
                    <button onClick={() => navigate("/contributions")}>Contributions</button>
                </div>

                <div className="form-card">

                    {error && (
                        <p style={{ color: "red", fontWeight: 600 }}>{error}</p>
                    )}

                    <form onSubmit={handleSubmit}>

                        <label>City:</label>
                        <select name="city" value={formData.city} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="CHI">Chicago</option>
                            <option value="DAL">Dallas</option>
                            <option value="DEN">Denver</option>
                            <option value="LA">Los Angeles</option>
                            <option value="NY">New York</option>
                        </select>

                        <label>Accommodates:</label>
                        <input type="number" min="1" name="accommodates" value={formData.accommodates} onChange={handleChange} required />

                        <label>Bedrooms:</label>
                        <input type="number" min="1" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />

                        <label>Beds:</label>
                        <input type="number" min="1" name="beds" value={formData.beds} onChange={handleChange} required />

                        <label>Room Type:</label>
                        <select name="room_type" value={formData.room_type} onChange={handleChange} required>
                            <option value="">Select</option>
                            {getRoomTypeOptions()}
                        </select>

                        <label>Host is Superhost:</label>
                        <select name="host_is_superhost" value={formData.host_is_superhost} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="TRUE">TRUE</option>
                            <option value="FALSE">FALSE</option>
                        </select>

                        <label>Minimum Nights:</label>
                        <input type="number" min="1" name="minimum_nights" value={formData.minimum_nights} onChange={handleChange} required />

                        <label>Availability (365):</label>
                        <input type="number" min="1" max="365" name="availability_365" value={formData.availability_365} onChange={handleChange} required />

                        <label>Number of Reviews:</label>
                        <input type="number" min="1" name="number_of_reviews" value={formData.number_of_reviews} onChange={handleChange} required />

                        <label>Review Score: Rating (1–5)</label>
                        <input type="number" min="1" max="5" step="0.01" name="review_scores_rating" value={formData.review_scores_rating} onChange={handleChange} />

                        <label>Review Score: Check-in (1–5)</label>
                        <input type="number" min="1" max="5" step="0.01" name="review_scores_checkin" value={formData.review_scores_checkin} onChange={handleChange} />

                        <label>Review Score: Accuracy (1–5)</label>
                        <input type="number" min="1" max="5" step="0.01" name="review_scores_accuracy" value={formData.review_scores_accuracy} onChange={handleChange} />

                        {/* Buttons Row */}
                        <div className="nav-buttons">
                            <button type="submit" >Predict Price</button>
                            <button type="button" onClick={handleReset}>Reset Form</button>
                        </div>
                    </form>

                    {/* ⭐ Prediction Box (Auto-scroll target) */}
                    {prediction !== null && (
                        <div className="prediction-box" ref={predictionRef}>
                            <h3 className="prediction-title">Predicted Price</h3>
                            <p className="prediction-value">${Number(prediction).toFixed(2)}</p>
                            <p className="prediction-note">(Estimated per night price based on XGBoost model)</p>
                        </div>
                    )}

                </div>

                
            </div>

            <footer className="footer">
                <p>© 2025 Team 10 — STA160 | UC Davis</p>
            </footer>
        </div>
    );
}

export default XGBoostForm;
