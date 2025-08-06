
import React, { useState } from 'react';
import { api } from '../api';

export default function RideForm(){
  const [form, setForm] = useState({ driver_id:1, vehicle_id:1, origin:'', destination:'', departure_time:'', available_seats:1, price:0 });
  
  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/rides', form);
      alert('Ride created');
    } catch (err){ console.error(err); alert('Error'); }
  };
  
  return (
    <div className="form-container">
      <form onSubmit={submit}>
        <h2>Post a Ride</h2>
        <div className="form-group">
          <label>Origin</label>
          <input 
            value={form.origin} 
            onChange={e=>setForm({...form, origin: e.target.value})} 
            placeholder="Enter pickup location"
            required
          />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <input 
            value={form.destination} 
            onChange={e=>setForm({...form, destination: e.target.value})} 
            placeholder="Enter destination"
            required
          />
        </div>
        <div className="form-group">
          <label>Departure Time</label>
          <input 
            type='datetime-local' 
            onChange={e=>setForm({...form, departure_time: e.target.value})} 
            required
          />
        </div>
        <div className="form-group">
          <label>Available Seats</label>
          <input 
            type='number' 
            value={form.available_seats} 
            onChange={e=>setForm({...form, available_seats: e.target.value})} 
            min="1"
            max="10"
            required
          />
        </div>
        <div className="form-group">
          <label>Price ($)</label>
          <input 
            type='number' 
            value={form.price} 
            onChange={e=>setForm({...form, price: e.target.value})} 
            min="0"
            step="0.01"
            placeholder="0.00"
            required
          />
        </div>
        <button type='submit'>Create Ride</button>
      </form>
    </div>
  );
}
