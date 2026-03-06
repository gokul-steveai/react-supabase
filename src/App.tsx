import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './db/client';

function App() {
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        console.log('Users:', data);
      }

      return { data, error };
    };
    fetchUsers();
  }, []);

  return (
    <h1>Test Supabase</h1>
  )
}

export default App
