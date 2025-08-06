
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';

export default function RideList(){
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    api.get('/rides')
      .then(res => {
        setRides(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  },[]);
  
  if (loading) {
    return (
      <div className="rides-container">
        <div className="loading">Loading rides...</div>
      </div>
    );
  }
  
  if (rides.length === 0) {
    return (
      <div className="rides-container">
        <h2>Available Rides</h2>
        <div className="empty-state">No rides available at the moment. Be the first to post a ride!</div>
      </div>
    );
  }
  
  return (
    <div className="rides-container">
      <h2>Available Rides</h2>
      <div className="rides-grid">
        {rides.map(r => (
          <div key={r.ride_id} className="ride-card">
            <div className="ride-route">
              <span>{r.origin}</span> to
              <span>{r.destination}</span>
            </div>
            <div className="ride-price">
              Rs. {r.price}
            </div>
            <div className="ride-details">
              <div className="ride-detail">
                <span className="ride-detail-label">Departure</span>
                <span className="ride-detail-value">
                  {new Date(r.departure_time).toLocaleDateString()}
                </span>
              </div>
              <div className="ride-detail">
                <span className="ride-detail-label">Time</span>
                <span className="ride-detail-value">
                  {new Date(r.departure_time).toLocaleTimeString()}
                </span>
              </div>
              <div className="ride-detail">
                <span className="ride-detail-label">Available Seats</span>
                <span className="ride-detail-value">{r.available_seats}</span>
              </div>
              <div className="ride-detail">
                <span className="ride-detail-label">Driver ID</span>
                <span className="ride-detail-value">{r.driver_id}</span>
              </div>
            </div>
            <div className="ride-actions">
              <Link to={'/chat/'+r.ride_id} className="chat-link">Chat with Driver</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
