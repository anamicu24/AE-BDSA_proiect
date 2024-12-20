import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProductForm from './AddProductForm';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Token not found. Please log in again.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (err) {
        setMessage('');
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Token not found. Please log in again.');
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      alert('Failed to delete product.');
    }
  };

  return (
    <div>
      <h2>Carti disponibile</h2>

      <AddProductForm onAddProduct={handleAddProduct} /> {/* Form to add product */}

      {message && <p>{message}</p>}

      <div className="product-list">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.category}</p>
            <p>Wishlist: {product.wishlist ? 'Yes' : 'No'}</p>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
