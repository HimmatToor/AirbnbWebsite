import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Papa from 'papaparse'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './CHI.css'

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

function CHI() {
  const navigate = useNavigate()
  const mapRef = useRef(null)

  const [listings, setListings] = useState([])

  // Chicago city center
  const centerCHI = [41.8781, -87.6298]

  // Load CSV Data
  useEffect(() => {
    Papa.parse('/data/CHI.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: ({ data }) => {
        const valid = data.filter(
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
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All")

  // Neighborhood list (clean)
  const neighborhoods = [
    "All",
    ...new Set(
      listings
        .map(l => l.neighbourhood?.trim())
        .filter(Boolean)
    )
  ]

  // Filter listings
  const filteredListings = listings.filter(l => {
    const matchRoom = roomType === "All" || l.room_type === roomType
    const matchGuests = l.accommodates >= minGuests
    const matchPrice = l.price >= minPrice && l.price <= maxPrice
    const matchNeighborhood =
      selectedNeighborhood === "All" ||
      l.neighbourhood?.trim() === selectedNeighborhood

    return matchRoom && matchGuests && matchPrice && matchNeighborhood
  })

  // Compute center of selected neighborhood
  const getNeighborhoodCenter = () => {
    if (selectedNeighborhood === "All") return centerCHI

    const subset = listings.filter(
      l => l.neighbourhood?.trim() === selectedNeighborhood
    )

    if (subset.length === 0) return centerCHI

    const avgLat = subset.reduce((sum, l) => sum + l.latitude, 0) / subset.length
    const avgLng = subset.reduce((sum, l) => sum + l.longitude, 0) / subset.length

    return [avgLat, avgLng]
  }

  // Recenter map on neighborhood change
  useEffect(() => {
    if (!mapRef.current) return

    const map = mapRef.current
    const target = getNeighborhoodCenter()

    map.flyTo(
      target,
      selectedNeighborhood === "All" ? 11 : 14,
      { duration: 1.4 }
    )

  }, [selectedNeighborhood])

  return (
    <div className="chi-container">

      {/* BACK BUTTON */}
      <div className="chi-topbar">
        <button className="back-button" onClick={() => navigate('/cities')}>
          ← Back
        </button>
      </div>

      <h1 className="chi-title">Chicago</h1>
      <p className="chi-subtitle">
        Try the filter & apply your preferences! <br />
        Zoom in to see more listings. <br />
        Tap on markers to view details.
      </p>

      {/* FILTER CARD */}
      <div className="chi-filter-card">
        <div className="chi-filter-grid">

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

      {/* MAP */}
      <div className="chi-map-wrapper">
        <MapContainer
          center={centerCHI}
          zoom={11}
          scrollWheelZoom
          className="chi-map"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={(zoom) =>
              zoom <= 12 ? 30 : zoom <= 13 ? 20 : 10
            }
            disableClusteringAtZoom={14}
          >
            {filteredListings.map((listing, idx) => (
              <Marker
                key={idx}
                position={[listing.latitude, listing.longitude]}
              >
                <Popup>
                  <div style={{ fontSize: "14px" }}>
                    <strong>{listing.name || "Listing"}</strong><br />
                    {listing.neighbourhood}<br />
                    <span style={{ color: "#ff6b6b" }}>
                      ${listing.price} / night
                    </span><br />
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

export default CHI
