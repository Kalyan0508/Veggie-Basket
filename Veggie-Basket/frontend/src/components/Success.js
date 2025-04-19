// client/src/components/Success.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();




  return (
    <div className="success-page">
      <h2>✅ Order Successful!</h2>
      <p>Thank you for shopping at GFG Fruit & Vegetable Market.</p>
      <button onClick={() => navigate('/dashboard')}>Back to Shop</button>
    </div>
  );
};

export default Success;
