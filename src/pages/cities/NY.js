import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Papa from 'papaparse'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './NY.css'

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

function NY() {
  const navigate = useNavigate()
  const [listings, setListings] = useState([])

  const centerNY = [40.7128, -74.006] // Manhattan center

  // Load CSV
  useEffect(() => {
    Papa.parse('/data/NY.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const rows = results.data

        const valid = rows.filter(
          (row) =>
            row.latitude &&
            row.longitude &&
            !isNaN(row.latitude) &&
            !isNaN(row.longitude)
        )

        setListings(valid)
      }
    })
  }, [])

  // Filter states
  const [roomType, setRoomType] = useState("All")
  const [minGuests, setMinGuests] = useState(1)

  // Price filters
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)

  // Neighborhood filter
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All")

  // Extract unique neighborhoods AFTER data loads
  const neighborhoods = ["All", ...new Set(listings.map(l => l.neighbourhood))]

  // Filter listings
  const filteredListings = listings.filter(listing => {
  
    // Room type
    const matchRoom =
      roomType === "All" || listing.room_type === roomType

    // Guest count
    const matchGuests =
      listing.accommodates >= minGuests

    // Price
    const matchPrice =
      listing.price >= minPrice &&
      listing.price <= maxPrice

    // Neighborhood
    const matchNeighborhood =
      selectedNeighborhood === "All" ||
      listing.neighbourhood === selectedNeighborhood

    return matchRoom && matchGuests && matchPrice && matchNeighborhood
  })

  return (
    <div className="ny-container">

      {/* BACK */}
      <div className="ny-topbar">
        <button className="back-button" onClick={() => navigate('/cities')}>
          ← Back
        </button>
      </div>

      <h1 className="ny-title">New York</h1>
      <p className="ny-subtitle">Try the filter & apply your preferences!<br />
      Zoom in to see more listings.<br />
      Tap on markers to view details.
      </p>

      {/* FILTER CARD */}
      <div className="ny-filter-card">

        <div className="ny-filter-grid">

          {/* Room Type */}
          <div className="filter-item">
            <label>Room Type</label>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <option value="All">All</option>
              <option value="Entire home/apt">Entire home/apt</option>
              <option value="Private room">Private room</option>
              <option value="Shared room">Shared room</option>
              <option value="Hotel room">Hotel room</option>
            </select>
          </div>

          {/* Guests */}
          <div className="filter-item">
            <label>Min Guests</label>
            <input
              type="number"
              min="1"
              value={minGuests}
              onChange={(e) => setMinGuests(Number(e.target.value))}
            />
          </div>

          {/* Price Range */}
          <div className="filter-item">
            <label>Price Range ($)</label>
            <div className="price-row">
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <span>–</span>
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Neighborhood */}
          <div className="filter-item">
            <label>Neighborhood</label>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
            >
              {neighborhoods.map((n, i) => (
                <option key={i} value={n}>{n}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      <div className="ny-map-wrapper">
        <MapContainer
          center={centerNY}
          zoom={15}
          scrollWheelZoom
          className="ny-map"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/*  Cluster group with default markers  */}
          <MarkerClusterGroup 
            chunkedLoading
            maxClusterRadius={(zoom) => (zoom <= 12 ? 50 : zoom <= 13 ? 35 : 20)}
          >
            {filteredListings.map((listing, idx) => (
              <Marker
                key={idx}
                position={[listing.latitude, listing.longitude]}
              >
                {/*  Popup on click  */}
                <Popup>
                  <div style={{ fontSize: "14px" }}>
                    <strong>{listing.name || "Listing"}</strong><br />
                    {listing.neighbourhood}<br />
                    <span style={{ color: "#ff6b6b" }}>
                      ${listing.price} / night
                    </span><br/>
                    <i>{listing.room_type}</i>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>

        </MapContainer>
      </div>
    </div>
  )
}

export default NY
