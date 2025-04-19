import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		const storedToken = localStorage.getItem('token');
		if (storedUser && storedToken) {
			setUser(JSON.parse(storedUser));
			setToken(storedToken);
		}
		setLoading(false);
	}, []);

	const login = (newToken, newUser) => {
		localStorage.setItem('token', newToken);
		localStorage.setItem('user', JSON.stringify(newUser));
		setUser(newUser);
		setToken(newToken);
	};

	const logout = () => {
		localStorage.clear();
		setUser(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
