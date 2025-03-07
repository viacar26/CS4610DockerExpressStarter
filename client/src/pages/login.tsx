import { useState } from "react";
import {  useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function checkUsername(username: string) {
    try {
      const response = await fetch(`/api/user/${username}`);
      if (!response.ok) {
        console.log("User not found", response.status);
        throw new Error("User not found");
      }
      const data = await response.json();
      // ensure username is not empty 
      if (username.length === 0) {      
        setError("Please enter a username");
        return;
      }
      // Log user in
      setUsername(username);
      navigate("/tutor");
      return;
    } catch (error) {
      console.error("Error checking user: ", error);
      return false;
    }
  }

  return (  
    <>
      <div className="card">
        <h2>What is your username?</h2>
        <p>Input a new username to sign up, or login with a username already used.</p>
        <input 
        type="text" 
        id="username" 
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
      </div>
      <div>
        <button className="login" onClick={() => checkUsername(username)}>Login</button>
      </div>
    </>
  );
};

 export default Login;