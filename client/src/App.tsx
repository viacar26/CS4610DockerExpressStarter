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
  const [selected, setSelected] = useState<string>("");
  return (  
    <>
      <div className="box">
        <h1>Be Well</h1>
        <div>
          <img src= {vineHeader} alt="Vine Header" id="vine"/>
        </div>
        <div className="card">
          <h2>Welcome to Be Well Tutor!</h2>
          <p> To begin the tutor, select a be well prompt from the options below.
            Our database will track your learning progress and allow you to revisit
            previous prompts.
          </p>
          <div>
            <label htmlFor="dropdown">Choose an option:</label>
            <select
              id="dropdown"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Rumination">Rumination is a repetitive, often unhelpful thought pattern. What are all of the effective strategies to counteract rumination?</option>
              <option value="Mindfulness">When using the meditative practice of resting your attention on your breath, what are helpful ways handle wandering thoughts?</option>
              <option value="Light">What are simple non-medication-based ways of treating seasonal affect disorder (seasonal depression)?</option>
              <option value="Sleep">What are some ways to improve the quality of your sleep?</option>
              <option value="Movement">What are important factors in using movement as medicine?</option>
            </select>
            {selected && <p>You selected: {selected}</p>}
            <button className='submit' onClick={() => navigate("/tutor")}>Submit</button>
          </div>
          <button className="login" onClick={() => navigate("/")}>Logout</button>
        </div>
        
      </div>
    </>
  )
}



export default App;
