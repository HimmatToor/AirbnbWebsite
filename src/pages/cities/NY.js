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

  return (
    <div className="ny-container">

      {/* BACK */}
      <div className="ny-topbar">
        <button className="back-button" onClick={() => navigate('/cities')}>
          ← Back
        </button>
      </div>

      <h1 className="ny-title">New York City</h1>
      <p className="ny-subtitle">Try zooming in & tapping on different listings!</p>

      <div className="ny-map-wrapper">
        <MapContainer
          center={centerNY}
          zoom={13}
          scrollWheelZoom
          className="ny-map"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ⭐ Cluster group with default markers ⭐ */}
          <MarkerClusterGroup chunkedLoading>
            {listings.map((listing, idx) => (
              <Marker
                key={idx}
                position={[listing.latitude, listing.longitude]}
              >
                {/* ⭐ Popup on click ⭐ */}
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
