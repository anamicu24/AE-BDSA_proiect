import React, { useState } from 'react';

const AddUserForm = ({ onUserAdded }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      email,
      password,
      role,
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('User added successfully');
        onUserAdded(); 
        setEmail('');
        setPassword('');
        setRole('user');
      } else {
        setMessage('Failed to add user');
      }
    } catch (error) {
      setMessage('Error adding user');
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="tester">Tester</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
