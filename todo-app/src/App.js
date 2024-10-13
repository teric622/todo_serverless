import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Auth from './Auth';
import Todo from './Todo';
import { auth } from './firebase';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>To-Do App</h1>
      {user ? <Todo /> : <Auth />}
    </div>
  );
};

export default App;