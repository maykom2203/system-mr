import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Customer from './pages/Customer';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/customer/products" element={ <Customer /> } />
      <Route path="/register" element={ <Register /> } />
    </Routes>
  );
}

export default App;
