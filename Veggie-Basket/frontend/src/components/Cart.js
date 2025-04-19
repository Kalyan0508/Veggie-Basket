// client/src/components/Cart.js
import React, { useContext } from 'react';
import { itemContext } from '../context/ItemContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const { cartItems, totalPrice } = useContext(itemContext);
	const navigate = useNavigate();

	return (
		<div className="cart-container">
			<h2>Your Cart</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<ul className="cart-list">
					{cartItems.map((item) => (
						<li key={item._id}>
							<img src={item.image} alt={item.name} height="50" />
							<span>{item.name}</span>
							<span>₹{item.price}</span>
						</li>
					))}
				</ul>
			)}
			<h3>Total: ₹{totalPrice}</h3>
			{cartItems.length > 0 && (
				<button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
			)}
		</div>
	);
};

export default Cart;
