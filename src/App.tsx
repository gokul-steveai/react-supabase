import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './db/client';

interface User {
  id: string;
  username: string | null;
  status: string | null;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.functions.invoke('get-user');
      if (error) {
        console.error('Error fetching users:', error);
      }

      if (data) {
        setUsers(data);
      }

      return { data, error };
    };
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
