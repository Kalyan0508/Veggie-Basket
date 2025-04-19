// import React, { useState, useEffect } from 'react';

// const AdminPanel = () => {
// 	const [products, setProducts] = useState([]);
// 	const [newProduct, setNewProduct] = useState({
// 		name: '', type: '', description: '', price: '', image: ''
// 	});

// 	const fetchProducts = async () => {
// 		const res = await fetch('http://localhost:5000/api/products');
// 		const data = await res.json();
// 		setProducts(data);
// 	};

// 	const handleAddProduct = async () => {
// 		const res = await fetch('http://localhost:5000/api/products', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(newProduct)
// 		});
// 		if (res.ok) {
// 			alert('Product added!');
// 			setNewProduct({ name: '', type: '', description: '', price: '', image: '' });
// 			fetchProducts();
// 		}
// 	};

// 	const handleDeleteProduct = async (id) => {
// 		await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
// 		fetchProducts();
// 	};

// 	useEffect(() => {
// 		fetchProducts();
// 	}, []);

// 	return (
// 		<div>
// 			<h2>Admin Panel</h2>
// 			<input placeholder="Name" onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
// 			<input placeholder="Type" onChange={e => setNewProduct({ ...newProduct, type: e.target.value })} />
// 			<input placeholder="Description" onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
// 			<input placeholder="Price" type="number" onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
// 			<input placeholder="Image URL" onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
// 			<button onClick={handleAddProduct}>Add Product</button>

// 			<ul>
// 				{products.map(p => (
// 					<li key={p._id}>
// 						{p.name} - ₹{p.price}
// 						<button onClick={() => handleDeleteProduct(p._id)}>Delete</button>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default AdminPanel;
