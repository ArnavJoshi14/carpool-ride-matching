
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from './supabaseClient';

export default function App(){
  const { user, signOut } = useAuth();
  return (
    <div className='container'>
      <header>
        <h1>Campus Carpool</h1>
        <nav>
          <Link to='/'>Rides</Link> | <Link to='/new-ride'>Post Ride</Link> | {!user ? <Link to='/login'>Login</Link> : <button onClick={signOut}>Sign out</button>}
        </nav>
      </header>
      <main><Outlet/></main>
    </div>
  );
}
