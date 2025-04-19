import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		const res = await fetch('http://localhost:5000/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password })
		});
		const data = await res.json();
		if (res.ok) {
			alert('Registration successful. Please login.');
			navigate('/');
		} else {
			alert(data.error);
		}
	};

	return (
		<div className="form-container">
			<h2>Register</h2>
			<form onSubmit={handleRegister}>
				<input type="text" placeholder="Name" onChange={e => setName(e.target.value)} required />
				<input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
				<input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
