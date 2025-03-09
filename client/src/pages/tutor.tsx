import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Tutor: React.FC = () => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState<string>("");
    const [reply, setReply] = useState<string>("");

    // Add prompt 
    const addPrompt = async (prompt: string) => {
        if (!prompt) {
          return;
        }
          try {
            const response = await fetch(`/api/prompt/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt }),
            });
            if (!response.ok) {
              console.log("Prompt not added", response.status);
              throw new Error("Prompt not added");
            }
            // add prompt to database
            // ask llm to reply
            setReply("That's a great question. I will try to formulate a really intelligent answer for you.");
            navigate("/tutor");
            return;
          } catch (error) {
            console.error("Error adding prompt: ", error);
          }
        }        
          

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
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            >
            <option value="">Select...</option>
            <option value="Rumination">Rumination is a repetitive, often unhelpful thought pattern. What are all of the effective strategies to counteract rumination?</option>
            <option value="Mindfulness">When using the meditative practice of resting your attention on your breath, what are helpful ways handle wandering thoughts?</option>
            <option value="Light">What are simple non-medication-based ways of treating seasonal affect disorder (seasonal depression)?</option>
            <option value="Sleep">What are some ways to improve the quality of your sleep?</option>
            <option value="Movement">What are important factors in using movement as medicine?</option>
            </select>
            {prompt && <p>You selected: {prompt}</p>}
            <button className='submit' onClick={(e) => addPrompt(prompt)}>Submit</button>
        </div>
        <div className="reply">
            <p>{reply}</p>
        </div>
        <button className="login" onClick={() => navigate("/")}>Logout</button>
        </div>
      </>
    );
  };
  
  export default Tutor;