import { useEffect, useState } from 'react';
import React from 'react'; 
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import vineHeader from './assets/vine_header.png';
import './App.css';


function App() {

  useEffect(() => {
    async function fetchData(username: string) {
      const response = await fetch(`/api/user/${username}`);
      const data = await response.json();
      console.log(data);
    }
    fetchData("test");
  });
  
  useEffect(() => {
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tutor" element={<Tutor />} />
      </Routes>
    </BrowserRouter>
  );
}


function Home() {
  const navigate = useNavigate();
  return (  
    <>
      <div className="box">
        <h1>Be Well</h1>
        <div>
          <img src= {vineHeader} alt="Vine Header" id="vine"/>
        </div>
        <div className="card">
          <h2>Welcome to Be Well Tutor!</h2>
          <p>
            The Be Well Tutor is meant to help users learn 
            strategies to benefit emotional and mental well-being.
            To learn more, give it a try!
          </p>
        </div>
        <div>
          <button className="login" onClick={() => navigate("/login")}>Sign Up</button>
          <button className="login" onClick={() => navigate("/login")}>Login</button>
        </div>
        
      </div>
    </>
  )
}

function Login() {
  const navigate = useNavigate();
  return (  
    <>
      <div className="box">
        <h1>Be Well</h1>
        <div>
          <img src= {vineHeader} alt="Vine Header" id="vine"/>
        </div>
        <div className="card">
          <h2>What is your username?</h2>
          <input type="text" id="username" placeholder="Enter your username"/>
        </div>
        <div>
          <button className="login" onClick={() => navigate("/tutor")}>Login</button>
        </div>
      </div>
    </>
  )
}

function Tutor() {
  const navigate = useNavigate();
  return (  
    <>
      <div className="box">
        <h1>Be Well</h1>
        <div>
          <img src= {vineHeader} alt="Vine Header" id="vine"/>
        </div>
        <div className="card">
          <h2>Welcome to Be Well Tutor!</h2>
        </div>
        <div>
          <button className="login" onClick={() => navigate("/")}>Logout</button>
        </div>
        
      </div>
    </>
  )
}

export default App;
