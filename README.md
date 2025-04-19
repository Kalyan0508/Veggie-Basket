# 🥦 Veggie-Basket - Fruit & Vegetable Market Web App

Veggie-Basket is a full-stack web application for buying fruits and vegetables online. Built using the **MERN stack** (MongoDB, Express, React, Node.js), it features a user-friendly shopping experience with authentication, cart functionality, checkout process, and admin control for managing products and orders.

## 🔧 Features

###  User
- Register & login with JWT authentication
- Add products to cart
- Persistent cart saved to MongoDB
- View and checkout orders

###  Admin
- Secure admin panel
- Add or remove products
- Manage orders (approve/reject)
- Protected routes with token-based access

## 🗂️ Project Structure

Veggie-Basket/ ├── backend/ # Node.js + Express server │ └── server.js
               ├── frontend/ # React frontend │ ├── public/ │ └── src/ │ └── App.js


##  Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/Veggie-Basket.git
cd Veggie-Basket

## Set up Backend
cd backend
npm install
npm start

## Set up Frontend
cd ../frontend
npm install
npm start

Create a .env file inside the backend folder with the following:

MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key


