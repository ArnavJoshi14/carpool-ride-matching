
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';

export default function Chat(){
  const { rideId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(()=>{
    let isMounted = true;
    // load existing chat messages
    supabase.from('Chat').select('*').eq('ride_id', rideId).order('timestamp',{ascending:true})
      .then(({data,error})=>{ if(isMounted && !error) setMessages(data || []); });

    // subscribe to new messages (inserts)
    const subscription = supabase.channel('public:chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Chat', filter: `ride_id=eq.${rideId}` }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return ()=> { isMounted=false; subscription.unsubscribe(); }
  },[rideId]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    // sender_id should be current user's id; placeholder here
    const sender_id = 1;
    await supabase.from('Chat').insert([{ ride_id: Number(rideId), sender_id, message: text }]);
    setText('');
  };

  return (
    <div className="form-container">
      <div className="chat-container">
        <h3>Chat for Ride {rideId}</h3>
        <div className="messages-container">
          {messages.length === 0 ? (
            <div className="empty-state">No messages yet. Start the conversation!</div>
          ) : (
            messages.map(m => (
              <div key={m.chat_id} className="message">
                <div className="message-sender">User {m.sender_id}</div>
                <div className="message-text">{m.message}</div>
                <div className="message-time">
                  {new Date(m.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>
        <form onSubmit={send} className="chat-form">
          <input 
            value={text} 
            onChange={e=>setText(e.target.value)} 
            placeholder='Type a message...' 
            required
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
}
