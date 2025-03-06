import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Tutor: React.FC = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string>("");
    return (  
      <>
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
      </>
    );
  };
  
  export default Tutor;