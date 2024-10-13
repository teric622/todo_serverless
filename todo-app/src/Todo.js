import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const user = auth.currentUser;

  const fetchTodos = async () => {
    if (user) {
      const querySnapshot = await getDocs(collection(db, `todos_${user.uid}`));
      setTodos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [user]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (user) {
      await addDoc(collection(db, `todos_${user.uid}`), { text: newTodo, done: false });
      setNewTodo('');
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, `todos_${user.uid}`, id));
    fetchTodos();
  };

  const toggleTodo = async (id, done) => {
    await updateDoc(doc(db, `todos_${user.uid}`, id), { done: !done });
    fetchTodos();
  };

  const updateTodo = async (id, currentText) => {
    const newText = prompt("Update your todo:", currentText);
    if (newText) {
      await updateDoc(doc(db, `todos_${user.uid}`, id), { text: newText });
      fetchTodos();
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h2>Your To-Do List</h2>
      <button onClick={handleSignOut}>Sign Out</button>
      <form onSubmit={addTodo}>
        <input 
          type="text" 
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)} 
          placeholder="Add new todo" 
          required 
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => toggleTodo(todo.id, todo.done)}>
              {todo.done ? 'Undo' : 'Done'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => updateTodo(todo.id, todo.text)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;