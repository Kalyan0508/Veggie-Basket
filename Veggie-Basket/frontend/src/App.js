import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProductList from './components/ProductList';
import Header from './components/Header';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Success from './components/Success';

import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider, { AuthContext } from './context/AuthContext';
import CustomItemContext from './context/ItemContext';

import './App.css';

// Route protection
const ProtectedRoute = ({ children }) => {
	const { user } = React.useContext(AuthContext);
	return user ? children : <Navigate to="/" />;
};

const App = () => {
	return (
		<AuthProvider>
			<CustomItemContext>
				<Router>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/register" element={<Register />} />

						{/* Protected dashboard routes */}
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<>
										<Header />
										<ProductList />
									</>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/cart"
							element={
								<ProtectedRoute>
									<>
										<Header />
										<Cart />
									</>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/checkout"
							element={
								<ProtectedRoute>
									<>
										<Header />
										<Checkout />
									</>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/success"
							element={
								<ProtectedRoute>
									<>
										<Header />
										<Success />
									</>
								</ProtectedRoute>
							}
						/>
						{/* <Route
							path="/admin"
							element={
								<ProtectedRoute>
									<AdminPanel />
								</ProtectedRoute>
							}
						/> */}
					</Routes>
				</Router>
			</CustomItemContext>
		</AuthProvider>
	);
};

export default App;
