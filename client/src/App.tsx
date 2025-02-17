import { useState } from 'react'
import React from 'react'
import vineHeader from './assets/vine_header.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="box">
        <h1>Be Well</h1>
        <div>
          <img src= {vineHeader} alt="Vine Header" id="vine"/>
        </div>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            The Be Well Tutor is meant to help users learn 
            strategies to benefit emotional and mental well-being.
            To learn more, check out the <a>About page.</a>
          </p>
        </div>
        <button className="login">Login</button>
      </div>
    </>
  )
}

export default App
