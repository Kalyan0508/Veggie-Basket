// context/ItemContext.js

import { createContext, useEffect, useState } from 'react';

const itemContext = createContext();

function CustomItemContext({ children }) {
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [itemsInCart, setItemsInCart] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	// Load products from backend
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:5000/api/products');
				const products = await response.json();
				setProducts(products);
			} catch (err) {
				console.error('Failed to fetch products:', err);
			}
		};

		fetchData();
	}, []);

	const addToCart = (product) => {
		setCartItems(prev => [...prev, product]);
		setItemsInCart(prev => prev + 1);
		setTotalPrice(prev => prev + product.price);
	};

	const removeFromCart = (product) => {
		const index = cartItems.findIndex(item => item._id === product._id);

		if (index !== -1) {
			const updatedCart = [...cartItems];
			const removedItem = updatedCart.splice(index, 1)[0];

			setCartItems(updatedCart);
			setItemsInCart(prev => prev - 1);
			setTotalPrice(prev => prev - removedItem.price);
		} else {
			console.log("Item not found in the cart");
		}
	};

	const clearCart = () => {
		setCartItems([]);
		setItemsInCart(0);
		setTotalPrice(0);
	};

	return (
		<itemContext.Provider value={{
			products,
			addToCart,
			removeFromCart,
			clearCart,
			cartItems,
			itemsInCart,
			totalPrice,
		}}>
			{children}
		</itemContext.Provider>
	);
}

export { itemContext };
export default CustomItemContext;
