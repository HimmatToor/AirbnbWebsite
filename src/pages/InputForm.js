import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./InputForm.css";

function InputForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
        review_scores_accuracy: "",
        zip: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", formData);

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            console.log("Response from backend:", data);
    
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div>
            <div className="input-form-container">
                <h2>Airbnb Price Prediction Form</h2>

                {/* Navigation */}
                <div className="nav-buttons">
                    <button onClick={() => navigate("/")}>Home</button>
                    <button onClick={() => navigate("/projectReport")}>Project Report</button>
                    <button onClick={() => navigate("/contributions")}>Contributions</button>
                </div>

                {/* Form card */}
                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <label>Accommodates:</label>
                        <input type="number" name="accommodates" value={formData.accommodates} onChange={handleChange} required />

                        <label>Bedrooms:</label>
                        <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />

                        <label>Beds:</label>
                        <input type="number" name="beds" value={formData.beds} onChange={handleChange} required />

                        <label>Room Type:</label>
                        <select name="room_type" value={formData.room_type} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="Entire home/apt">Entire home/apt</option>
                            <option value="Private room">Private room</option>
                            <option value="Shared room">Shared room</option>
                            <option value="Hotel room">Hotel room</option>
                        </select>

                        <label>Host is Superhost:</label>
                        <select name="host_is_superhost" value={formData.host_is_superhost} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>

                        <label>Minimum Nights:</label>
                        <input type="number" name="minimum_nights" value={formData.minimum_nights} onChange={handleChange} required />

                        <label>Availability (365 days):</label>
                        <input type="number" name="availability_365" value={formData.availability_365} onChange={handleChange} required />

                        <label>Number of Reviews:</label>
                        <input type="number" name="number_of_reviews" value={formData.number_of_reviews} onChange={handleChange} required />

                        <label>Review Score: Rating</label>
                        <input type="number" name="review_scores_rating" value={formData.review_scores_rating} onChange={handleChange} />

                        <label>Review Score: Check-in</label>
                        <input type="number" name="review_scores_checkin" value={formData.review_scores_checkin} onChange={handleChange} />

                        <label>Review Score: Accuracy</label>
                        <input type="number" name="review_scores_accuracy" value={formData.review_scores_accuracy} onChange={handleChange} />

                        <label>ZIP Code:</label>
                        <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />

                        <button type="submit">Predict Price</button>
                    </form>
                </div>
            </div>

            <footer className="footer">
                <p>© 2025 Team 10 — STA160 | UC Davis</p>
            </footer>
        </div>
    );
}

export default InputForm;