import { useState } from "react";
import {  useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function checkUsername(username: string) {
    try {
      console.log("Checking user in checkUsername:", username);
      const response = await fetch(`/api/user/${username}`);
      console.log("Response:", response);
      if (!response.ok) {
        console.log("User not found", response.status);
        throw new Error("User not found");
      }
      const data = await response.json();
      console.log("API Response:", data); 
      return data.exists;
    } catch (error) {
      console.error("Error checking user: ", error);
      return false;
    }
  }

    const loginUser = async () => {
      if (username.length === 0) {      
        setError("Please enter a username");
        return;
      }

      const userTaken = await checkUsername(username);
      if (userTaken) {
        setError("Username is already taken. Please try again.");
        return;
      }

      // Create a new user in database
      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username })
        });

        if (!response.ok) {
          throw new Error("Error creating user");
        }

      setError("");
      navigate("/tutor");
      } catch (error) {
        console.error("Error creating user: ", error);
        setError("Error creating user. Please try again.");
      }
  };

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
        <button className="login" onClick={loginUser}>Login</button>
      </div>
    </>
  );
};

 export default Login;