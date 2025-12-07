import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InputForm.css";

function LSRTForm() {
    const navigate = useNavigate();

    const AMENITY_OPTIONS = [
        "Wifi",
        "Kitchen",
        "Heating",
        "Air conditioning",
        "Washer",
        "Dryer",
        "Hair dryer",
        "TV",
        "Shampoo",
        "Smoke alarm",
        "Refrigerator",
        "Dishwasher",
        "Microwave",
        "Oven",
        "Stove",
        "Coffee maker",
        "Backyard / patio",
        "Parking (street or on-premise)",
        "Self check-in / Smart lock",
        "Pets allowed / pet-friendly",
        "Fire extinguisher / First aid kit"
    ];

    const [formData, setFormData] = useState({
        city: "",
        amenities: [],
        minimum_nights: "",
        number_of_reviews: "",
        calculated_host_listings_count: "",
        availability_365: "",
        beds: "",
        bedrooms: "",
        accommodates: "",
        review_scores_rating: "",
        room_type: "",
        host_is_superhost: "",
        zip: "",
        season: ""
    });

    const [error, setError] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [prediction, setPrediction] = useState(null);  // ⭐ NEW

    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const predictionRef = useRef(null);

    // ⭐ Auto-scroll when prediction appears
    useEffect(() => {
        if (prediction !== null && predictionRef.current) {
            predictionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [prediction]);

    // Handle text/number changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    // Toggle amenity selection
    const toggleAmenity = (amenity) => {
        const updated = formData.amenities.includes(amenity)
            ? formData.amenities.filter(a => a !== amenity)
            : [...formData.amenities, amenity];

        setFormData({ ...formData, amenities: updated });
    };

    // Backspace removes last tag
    const handleBackspace = (e) => {
        if (e.key === "Backspace" && formData.amenities.length > 0 && inputRef.current === document.activeElement) {
            const updated = [...formData.amenities];
            updated.pop();
            setFormData({ ...formData, amenities: updated });
        }
    };

    // ⭐ Reset form
    const handleReset = () => {
        setFormData({
            city: "",
            amenities: [],
            minimum_nights: "",
            number_of_reviews: "",
            calculated_host_listings_count: "",
            availability_365: "",
            beds: "",
            bedrooms: "",
            accommodates: "",
            review_scores_rating: "",
            room_type: "",
            host_is_superhost: "",
            zip: "",
            season: ""
        });
        setError("");
        setPrediction(null);
    };

    // Validation
    const validateForm = () => {
        const numericFields = [
            "minimum_nights", "number_of_reviews", "calculated_host_listings_count",
            "availability_365", "beds", "bedrooms", "accommodates"
        ];

        for (let field of numericFields) {
            if (Number(formData[field]) < 1) {
                return `${field.replace(/_/g, " ")} must be at least 1.`;
            }
        }

        const rating = Number(formData.review_scores_rating);
        if (rating < 1 || rating > 5) return "Review score must be between 1–5.";

        if (!["1", "0"].includes(formData.host_is_superhost))
            return "Superhost must be TRUE or FALSE.";

        if (!formData.season) return "Please select a season.";
        if (formData.amenities.length === 0) return "Select at least one amenity.";

        return null;
    };

    const getRoomTypeOptions = () => {
        if (formData.city === "DAL" || formData.city === "DEN") {
            return (
                <>
                    <option value="Entire home/apt">Entire home/apt</option>
                    <option value="Private room">Private room</option>
                </>
            );
        }
        return (
            <>
                <option value="Entire home/apt">Entire home/apt</option>
                <option value="Private room">Private room</option>
                <option value="Hotel room">Hotel room</option>
            </>
        );
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validateForm();
        if (err) return setError(err);

        try {
            const res = await fetch("https://deploybackend-964220208800.us-west2.run.app/predict_RNN", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("LSRT Prediction:", data);

            setPrediction(data.prediction); // ⭐ NEW

        } catch (error) {
            console.error(error);
            setError("Backend error");
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <div className="input-form-container">

                <div className="ny-topbar">
                    <button className="back-button" onClick={() => navigate("/inputForm")}>← Back</button>
                </div>

                <h2>LSRT Price Prediction</h2>

                <div className="nav-buttons">
                    <button onClick={() => navigate("/")}>Home</button>
                    <button onClick={() => navigate("/projectReport")}>Project Report</button>
                    <button onClick={() => navigate("/cities")}>Explore Cities</button>
                    <button onClick={() => navigate("/contributions")}>Contributions</button>
                </div>

                <div className="form-card">

                    {error && <p style={{ color: "red", fontWeight: 600 }}>{error}</p>}

                    <form onSubmit={handleSubmit}>

                        {/* CITY */}
                        <label>City:</label>
                        <select name="city" value={formData.city} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="CHI">Chicago</option>
                            <option value="DAL">Dallas</option>
                            <option value="DEN">Denver</option>
                            <option value="LA">Los Angeles</option>
                            <option value="NY">New York</option>
                        </select>

                        {/* AMENITIES */}
                        <label>Amenities (select multiple):</label>

                        <div
                            ref={containerRef}
                            className={`tag-multi-select ${showDropdown ? "open" : ""}`}
                        >
                            <div
                                className="tag-input-box"
                                tabIndex={0}
                                onClick={() => setShowDropdown(!showDropdown)}
                                onKeyDown={handleBackspace}
                                ref={inputRef}
                            >
                                {formData.amenities.length === 0 ? (
                                    <span className="placeholder">Select amenities...</span>
                                ) : (
                                    formData.amenities.map((a) => (
                                        <div className="tag" key={a}>
                                            {a}
                                            <span
                                                className="remove-tag"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleAmenity(a);
                                                }}
                                            >
                                                ×
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>

                            {showDropdown && (
                                <div className="tag-dropdown">
                                    {AMENITY_OPTIONS.map((amenity) => {
                                        const selected = formData.amenities.includes(amenity);
                                        return (
                                            <div
                                                key={amenity}
                                                className={`dropdown-option ${selected ? "selected" : ""}`}
                                                onClick={() => toggleAmenity(amenity)}
                                            >
                                                {amenity}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* INPUTS */}
                        <label>Minimum Nights:</label>
                        <input type="number" min="1" name="minimum_nights" value={formData.minimum_nights} onChange={handleChange} required />

                        <label>Number of Reviews:</label>
                        <input type="number" min="1" name="number_of_reviews" value={formData.number_of_reviews} onChange={handleChange} required />

                        <label>Host Listings Count:</label>
                        <input type="number" min="1" name="calculated_host_listings_count" value={formData.calculated_host_listings_count} onChange={handleChange} required />

                        <label>Availability (365):</label>
                        <input type="number" min="1" max="365" name="availability_365" value={formData.availability_365} onChange={handleChange} required />

                        <label>Beds:</label>
                        <input type="number" min="1" name="beds" value={formData.beds} onChange={handleChange} required />

                        <label>Bedrooms:</label>
                        <input type="number" min="1" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />

                        <label>Accommodates:</label>
                        <input type="number" min="1" name="accommodates" value={formData.accommodates} onChange={handleChange} required />

                        <label>Review Score: Rating (1–5)</label>
                        <input type="number" min="1" max="5" step="0.01" name="review_scores_rating" value={formData.review_scores_rating} onChange={handleChange} required />

                        {/* Room Type */}
                        <label>Room Type:</label>
                        <select name="room_type" value={formData.room_type} onChange={handleChange} required>
                            <option value="">Select</option>
                            {getRoomTypeOptions()}
                        </select>

                        {/* Superhost */}
                        <label>Host is Superhost:</label>
                        <select name="host_is_superhost" value={formData.host_is_superhost} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="1">TRUE</option>
                            <option value="0">FALSE</option>
                        </select>

                        {/* ZIP Code */}
                        <label>ZIP Code:</label>
                        <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />

                        {/* Season */}
                        <label>Season:</label>
                        <select name="season" value={formData.season} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                        </select>

                        {/* BUTTON ROW */}
                        <div className="nav-buttons">
                            <button type="submit" >Predict Price</button>
                            <button type="button" onClick={handleReset}>Reset Form</button>
                        </div>
                    </form>

                    {/* ⭐ Prediction Output */}
                    {prediction !== null && (
                        <div className="prediction-box" ref={predictionRef}>
                            <h3 className="prediction-title">Predicted Price</h3>
                            <p className="prediction-value">${Number(prediction).toFixed(2)}</p>
                            <p className="prediction-note">(Estimated per night price based on LSRT model)</p>
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

export default LSRTForm