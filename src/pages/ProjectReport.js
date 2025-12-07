import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectReport.css";

function ProjectReport() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="report-page">

                {/* NAVIGATION */}
                <div className="top-nav">
                    <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
                    <button className="nav-btn" onClick={() => navigate("/cities")}>Explore Cities</button>
                    <button className="nav-btn" onClick={() => navigate("/inputForm")}>Input Form</button>
                    <button className="nav-btn" onClick={() => navigate("/contributions")}>Contributions</button>
                </div>

                {/* ===== OVERVIEW BOX ===== */}
                <section className="overview-box">
                    <h1 className="report-title">Airbnb Price Explorer</h1>
                    <h3 className="report-subtitle">Modeling Travel Affordability Across Major U.S. Cities</h3>

                    <p className="overview-text">
                        This project investigates what drives Airbnb listing prices across Chicago, Dallas,
                        Denver, Los Angeles, and New York using Inside Airbnb data. We built a unified
                        cleaning pipeline, explored spatial and seasonal variation, and developed three models:
                        a Linear Mixed-Effects Model (LMM), XGBoost, and an LSTM Sequential Regression Model.
                    </p>

                    <p className="overview-text">
                        XGBoost achieved the strongest predictive accuracy, LMM captured strong neighborhood
                        effects, and LSTM learned nonlinear interactions and limited seasonal patterns. These
                        models power our interactive web tool that predicts Airbnb prices based on user inputs.
                    </p>

                    <div className="figure-row">
                        <div className="overview-figure figure-small">
                            <img src={`${process.env.PUBLIC_URL}/assets/dallas_hist.png`} alt="Dallas Price Distribution" />
                            <p className="figure-caption">Figure 1. Histogram of Dallas price distribution.</p>
                        </div>

                        <div className="overview-figure figure-small">
                            <img src={`${process.env.PUBLIC_URL}/assets/la_hist.png`} alt="LA Histogram" />
                            <p className="figure-caption">Figure 2. Histogram of Los Angeles price distribution.</p>
                        </div>
                    </div>
                </section>

                {/* ===== ABSTRACT ===== */}
                <section>
                    <h2>Abstract</h2>
                    <p>
                        This project investigates the determinants of Airbnb pricing across Chicago,
                        Dallas, Denver, Los Angeles, and New York. Using Inside Airbnb data, we built
                        a cross-city cleaning pipeline and applied LMM, XGBoost, and LSTM models.
                        XGBoost delivered the highest predictive accuracy, while LMM revealed strong
                        neighborhood-level variation and LSTM captured nonlinear interactions and
                        limited sequential patterns.
                    </p>
                </section>

                {/* ===== INTRODUCTION ===== */}
                <section>
                    <h2>Introduction & Motivation</h2>
                    <p>
                        Airbnb pricing varies widely due to location, property features, amenities,
                        host behavior, and seasonal fluctuations. Our project addresses three main
                        questions:
                    </p>
                    <ul>
                        <li>Which listing characteristics most strongly influence price?</li>
                        <li>How much variation is due to neighborhood differences?</li>
                        <li>Do nonlinear or sequential models outperform linear baselines?</li>
                    </ul>

                    <div className="figure-row">
                        <div className="overview-figure figure-small">
                            <img src={`${process.env.PUBLIC_URL}/assets/ny_roomtype_boxplot.png`} alt="NY Room Type Boxplot" />
                            <p className="figure-caption">Figure 3. Boxplot of New York prices by room type.</p>
                        </div>

                        <div className="overview-figure figure-small">
                            <img src={`${process.env.PUBLIC_URL}/assets/ny_roomtype_violin.png`} alt="NY Room Type Violin Plot" />
                            <p className="figure-caption">Figure 4. Violin–boxplot of New York prices by room type.</p>
                        </div>
                    </div>
                </section>

                {/* ===== DATA & METHODS ===== */}
                <section>
                    <h2>Data & Methods</h2>

                    <h3>Data</h3>
                    <p>
                        We use March, June, and December listing data for all five cities. Key features include
                        price, room type, accommodates, beds, bedrooms, bathrooms, host superhost status,
                        amenities, latitude/longitude, and zip code.
                    </p>

                    <h4>Data Cleaning</h4>
                    <p>
                        We removed invalid prices, standardized bathroom counts, applied log(price) transformation,
                        and excluded features with excessive missing values. Outliers above $1000 were removed.
                    </p>


                    <div className="overview-figure figure-small">
                        <img src={`${process.env.PUBLIC_URL}/assets/chicago_corr_heatmap.png`} alt="Chicago Correlation Heatmap" />
                        <p className="figure-caption">Figure 5. Correlation heatmap of Airbnb features in Chicago.</p>
                    </div>

                    <div className="figure-row">
                        <div className="overview-figure figure-small">
                            <img src={`${process.env.PUBLIC_URL}/assets/chicago_price_vs_rating.png`} alt="Price vs Rating" />
                            <p className="figure-caption">Figure 6. Scatterplot of Chicago price vs. review score rating.</p>
                        </div>

                        <div className="overview-figure figure-small">
                            <img src={`${process.env.PUBLIC_URL}/assets/chicago_price_vs_availability.png`} alt="Price vs Availability" />
                            <p className="figure-caption">Figure 7. Scatterplot of Chicago price vs. availability.</p>
                        </div>
                    </div>

                        <div className="overview-figure figure-small">
                            <img src={`${process.env.PUBLIC_URL}/assets/la_spatial_map.png`} alt="LA Spatial Price Map" />
                            <p className="figure-caption">Figure 8. Latitude–longitude price map of Los Angeles.</p>
                        </div>

                    <h3>Modeling Methods</h3>

                    <h4>Linear Mixed-Effects Model (LMM)</h4>
                    <p>
                        Fixed effects include room type, accommodates, bedrooms, bathrooms,
                        review rating, and superhost status. Random intercepts by zip code capture
                        neighborhood-level pricing differences.
                    </p>

                    <div className="overview-figure figure-large">
                        <img src={`${process.env.PUBLIC_URL}/assets/lmm_qqplots.png`} alt="LMM QQ Plots" />
                        <p className="figure-caption">
                            Figure 9. QQ plots of standardized residuals for the LMM across cities.
                        </p>
                    </div>

                    <div className="overview-figure figure-large">
                        <img src={`${process.env.PUBLIC_URL}/assets/lmm_residuals.png`} alt="LMM Residuals vs Fitted" />
                        <p className="figure-caption">
                            Figure 10. Residuals vs. fitted values for the LMM across cities.
                        </p>
                    </div>

                    <h4>XGBoost</h4>
                    <p>
                        We train city-specific XGBoost models with dummy-encoded features and optimized
                        hyperparameters via cross-validation.
                    </p>

                    <h4>LSTM Sequential Regression</h4>
                    <p>
                        LSTM models use embeddings for high-cardinality features and capture limited
                        seasonal patterns across three monthly snapshots.
                    </p>
                </section>

                {/* ===== RESULTS ===== */}
                <section>
                    <h2>Results & Interpretation</h2>

                    <h3>Linear Mixed-Effects Model</h3>
                    <p>
                        LMM reveals strong neighborhood effects. Cities with steep spatial gradients (NYC, LA)
                        show large gaps between marginal and conditional R².
                    </p>

                    <h3>XGBoost</h3>
                    <p>
                        XGBoost achieves RMSE of $83–$92 across cities and explains 57–70% of price variance.
                    </p>

                    <div className="overview-figure figure-large">
                        <img src={`${process.env.PUBLIC_URL}/assets/xgb_pred_vs_actual.png`} alt="XGBoost Prediction vs Actual" />
                        <p className="figure-caption">
                            Figure 11. Prediction vs. actual prices for XGBoost across cities.
                        </p>
                    </div>

                    <h3>LSTM Model</h3>
                    <p>
                        LSTM captures nonlinear interactions and moderate temporal variation but underperforms
                        XGBoost, with RMSE ranging from $126–$142.
                    </p>

                    <h3>Model Comparison</h3>
                    <ul>
                        <li><b>LMM:</b> Highly interpretable; moderate predictive accuracy.</li>
                        <li><b>XGBoost:</b> Best overall performance and robustness.</li>
                        <li><b>LSTM:</b> Captures feature interactions and limited seasonality.</li>
                    </ul>
                </section>

                {/* ===== DISCUSSION ===== */}
                <section>
                    <h2>Discussion & Reflection</h2>
                    <p>
                        Dataset inconsistencies and communication issues between subteams caused delays,
                        reinforcing the importance of shared documentation and full-team updates.
                    </p>
                    <p>
                        Future improvements include transformer-based modeling of amenity text, adding more
                        months for true seasonality modeling, and incorporating neighborhood socioeconomic data.
                    </p>
                </section>

                {/* ===== REFERENCES ===== */}
                <section>
                    <h2>Acknowledgments & References</h2>
                    <p>
                        Data from Inside Airbnb. Modeling done in R, Python, TensorFlow, and Keras.
                        Frontend developed with React and Leaflet. Mapping tiles from OpenStreetMap.
                    </p>
                </section>

            </div>

            <footer className="footer">
                <p>© 2025 Team 10 — Airbnb Price Explorer</p>
            </footer>
        </div>
        
    );
}

export default ProjectReport
