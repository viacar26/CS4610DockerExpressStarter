import { useEffect, useState } from 'react';
import React from 'react'; 
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Layout from './components/layout';
import Home from './pages/home';
import Login from './pages/login';
import Tutor from './pages/tutor';
import './App.css';




const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tutor" element={<Tutor />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
