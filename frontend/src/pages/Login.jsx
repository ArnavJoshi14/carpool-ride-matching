
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if(error) return alert(error.message);
    alert('Logged in');
    nav('/');
  };

  const signUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if(error) return alert(error.message);
    alert('Welcome!');
    nav('/');
  };

  return (
    <div className="form-container">
      <form onSubmit={signIn}>
        <h2>Login / Sign up</h2>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email"
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type='password' 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="button-group">
          <button type='submit'>Sign in</button>
          <button onClick={signUp} type='button'>Sign up</button>
        </div>
      </form>
    </div>
  );
}
