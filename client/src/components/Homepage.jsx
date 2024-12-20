
import React from 'react';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';

const Homepage = () => {
  return (
    <div>
      <h1>Pagina Principală</h1>
      <ProductManagement/>
      <UserManagement/>
    </div>
  );
};

export default Homepage;
