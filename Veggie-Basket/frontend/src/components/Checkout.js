// client/src/components/Checkout.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemContext } from '../context/ItemContext';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useContext(itemContext);
  const navigate = useNavigate();

  const handleOrder = () => {
    clearCart();
    navigate('/success');
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>You're about to place an order for {cartItems.length} items.</p>
      <h3>Total Amount: ₹{totalPrice}</h3>
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
