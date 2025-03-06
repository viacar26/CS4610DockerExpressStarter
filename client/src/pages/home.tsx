import { useNavigate } from "react-router";

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (  
      <>
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
      </>
    )
  };

  export default Home;
  