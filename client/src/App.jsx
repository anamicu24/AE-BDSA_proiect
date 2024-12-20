import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import UserManagement from './components/UserManagement';
import AddUserForm from './components/AddUserForm'; 
import ProductList from './components/ProductManagement';
import useCheckToken from './hooks/useCheckToken';

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useCheckToken(setLoading, setIsLoggedIn, setUserRole); 
  useEffect(() => {
    if (isLoggedIn) {
      if (userRole === 'admin') {
        navigate('/users'); 
      } else if (userRole === 'tester') {
        navigate('/products'); 
      } else {
        navigate('/'); 
      }
    }
  }, [isLoggedIn, userRole, navigate]);

  return (
    <div>
      <Routes>
        {loading ? (
          <Route path="*" element={<div>Loading...</div>} />
        ) : (
          <>
            <Route path="/" element={isLoggedIn ? <Homepage /> : <Login />} />

            <Route path="/login" element={<Login />} />

            <Route path="/users" element={isLoggedIn && userRole === 'admin' ? <UserManagement /> : <div>Access Denied</div>} />

            <Route path="/users/add" element={isLoggedIn && userRole === 'admin' ? <AddUserForm /> : <div>Access Denied</div>} />

            <Route path="/products" element={isLoggedIn && userRole === 'tester' ? <ProductList /> : <div>Access Denied</div>} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
