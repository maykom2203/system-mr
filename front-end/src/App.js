import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Customer from './pages/Customer';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      {/* <Route path="/customer" element={ <Customer /> } /> */}
      <Route path="/customer/products" element={ <Customer /> } />
    </Routes>
  );
}

export default App;
