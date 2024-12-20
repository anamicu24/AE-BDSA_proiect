import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [wishlist, setWishlist] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      name,
      price,
      category,
      wishlist,
    };

    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Product added successfully');
        onAddProduct(data.data); // Reîncarcă produsele
        setName('');
        setPrice('');
        setCategory('');
        setWishlist(false);
      } else {
        setMessage('Failed to add product');
      }
    } catch (error) {
      setMessage('Error adding product');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <label>
          Wishlist
          <input
            type="checkbox"
            checked={wishlist}
            onChange={() => setWishlist(!wishlist)}
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
