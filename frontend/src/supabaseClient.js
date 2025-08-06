
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Hook to access auth state
export function useAuth(){
  const [user, setUser] = useState(supabase.auth.getUser ? null : null);

  useEffect(()=>{
    let mounted = true;
    // get initial session
    supabase.auth.getSession().then(({data})=>{
      if(!mounted) return;
      setUser(data?.session?.user ?? null);
    }).catch(()=>{});

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return ()=> sub?.subscription?.unsubscribe ? sub.subscription.unsubscribe() : sub?.unsubscribe?.();
  },[]);

  const signIn = async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  };
  const signUp = async (email, password) => {
    return supabase.auth.signUp({ email, password });
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, signIn, signUp, signOut };
}
