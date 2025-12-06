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

            <h1 className="report-title">Airbnb Price Explorer — Project Overview</h1>
            <h3 className="report-authors">Team 10 · STA160 Fall 2025</h3>

            {/* SECTION 1 */}
            <section>
                <h2>Abstract</h2>
                <p>
                    This project investigates the determinants of Airbnb pricing across Chicago, Dallas,
                    Denver, Los Angeles, and New York using Inside Airbnb data. After constructing a
                    unified cross-city cleaning pipeline, we analyze seasonal snapshots and build multiple
                    predictive models including linear regression, linear mixed-effects (LMM), XGBoost,
                    and an LSTM-based sequential regression model.
                </p>
                <p>
                    XGBoost achieves the highest predictive accuracy, the LMM shows strong spatial effects,
                    and the LSTM extracts limited sequential patterns across months. We deploy the final
                    modeling pipeline through an interactive web application.
                </p>
            </section>

            {/* SECTION 2 */}
            <section>
                <h2>Introduction & Motivation</h2>
                <p>
                    Airbnb pricing varies widely across cities and property types, making it difficult for hosts
                    and travelers to evaluate fair listing prices. Our project addresses three main questions:
                </p>
                <ul>
                    <li>Which listing characteristics most strongly influence price?</li>
                    <li>How much variation is explained by neighborhood (zip code)?</li>
                    <li>Do nonlinear or sequential models improve predictive accuracy?</li>
                </ul>
            </section>

            {/* SECTION 3 */}
            <section>
                <h2>Data & Methods</h2>

                <h3>Data</h3>
                <p>
                    We use Inside Airbnb listing data for March, June, and December — the only months
                    available across all five cities. Important features include price, room type, capacity,
                    bedrooms, bathrooms, amenities, zip code, and host attributes.
                </p>

                <h4>Data Cleaning</h4>
                <p>
                    A unified pipeline ensured consistent formatting across cities. We removed invalid
                    prices, standardized bathroom counts, log-transformed price, and dropped missing
                    review-related features.
                </p>

                <h3>Modeling Methods</h3>
                <h4>Linear Mixed-Effects Model (LMM)</h4>
                <p>
                    Fixed effects: room type, accommodates, bedrooms, bathrooms, review rating,
                    superhost.  
                    Random effects: zip-code intercepts to capture neighborhood pricing.
                </p>

                <h4>XGBoost</h4>
                <p>
                    Captures nonlinear interactions using dummy-encoded features and cross-validated
                    boosting rounds.
                </p>

                <h4>LSTM Sequential Regression</h4>
                <p>
                    Uses three snapshot months as a short time series with embedding layers for
                    high-cardinality categorical features.
                </p>
            </section>

            {/* SECTION 4 */}
            <section>
                <h2>Results & Interpretation</h2>

                <h3>Linear Mixed-Effects Model</h3>
                <p>
                    Strong spatial effects were observed: cities with sharp price gradients (LA, NYC)
                    showed large differences between marginal and conditional R². Bedrooms and
                    accommodates consistently increased price.
                </p>

                <h3>XGBoost</h3>
                <p>
                    Delivered the strongest predictive accuracy with RMSE ≈ $83–$92. Capacity-related
                    variables and room type were the most important predictors.
                </p>

                <h3>LSTM Model</h3>
                <p>
                    Captured modest seasonal patterns; RMSE ranged from $126–$142. Performs better
                    than linear methods on nonlinear interactions but below XGBoost overall.
                </p>

                <h3>Model Comparison</h3>
                <ul>
                    <li><b>LMM</b>: Highly interpretable; moderate accuracy.</li>
                    <li><b>XGBoost</b>: Best predictive performance across all cities.</li>
                    <li><b>LSTM</b>: Captures interactions + limited temporal signal.</li>
                </ul>
            </section>

            {/* SECTION 5 */}
            <section>
                <h2>Discussion & Reflection</h2>
                <p>
                    Data inconsistencies across cities and months required dropping non-overlapping
                    features. A miscommunication between teams led to the wrong dataset being modeled,
                    reinforcing the importance of coordinated weekly meetings and whole-team updates.
                </p>
                <p>
                    Future work includes richer amenity text modeling, more months for real seasonality,
                    and integrating host behavior or neighborhood socioeconomic data.
                </p>
            </section>

            {/* SECTION 6 */}
            <section>
                <h2>Acknowledgments & References</h2>
                <p>
                    We acknowledge Inside Airbnb for providing data, as well as R, Python, TensorFlow,
                    React, and Leaflet ecosystems used throughout the project.
                </p>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <p>© 2025 Team 10 — Airbnb Price Explorer</p>
            </footer>

        </div>
    );
}

export default ProjectReport
