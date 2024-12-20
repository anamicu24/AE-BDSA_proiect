import React, { useEffect, useState } from 'react';
import AddUserForm from './AddUserForm'; 

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();  
  }, []);


  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUsers(data); 
    } catch (error) {
      setMessage('Error fetching users');
    }
  };


  const handleUserAdded = () => {
    fetchUsers();  
  };

 
  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('User role updated');
 
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        setMessage('Failed to update role');
      }
    } catch (error) {
      setMessage('Error updating role');
    }
  };


  const handleUserDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setMessage('User deleted successfully');
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        setMessage('Failed to delete user');
      }
    } catch (error) {
      setMessage('Error deleting user');
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {message && <p>{message}</p>}
       {}
      <div className="userList">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="userCard">
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <button onClick={() => handleRoleChange(user.id, 'admin')}>Set Admin</button>
              <button onClick={() => handleRoleChange(user.id, 'tester')}>Set Tester</button>
              <button onClick={() => handleUserDelete(user.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
      <AddUserForm onUserAdded={handleUserAdded} />
    </div>
  );
};

export default UserManagement;
