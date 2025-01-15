import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../Styles/login.css"

const URL = import.meta.env.VITE_BASE_URL;

const Login = ({ setToggleLogin }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function postFetch(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      const data = await res.json();

      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        await setToggleLogin(true);
        navigate("/dashboard");
      } else {
        console.log("JWT Login Failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert("You must enter a username and password");
      return;
    }
    postFetch(user);
  }

  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const user = { username: "demo", password: "password" };
    postFetch(user);
    setToggleLogin(true)
  }

  return (
    <div style={{ textAlign: "center" }} className="login-container">
      <h3 style={{textAlign:'center', fontStyle: 'unset'}}>Please Login if you have an account if not register below </h3>
      <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="username"
            autoComplete="username"
            onChange={handleChange}
            className="login-input"
          />
        </label>

        <label htmlFor="password">
          <input
            id="password"
            value={user.password}
            type="password"
            placeholder="password"
            onChange={handleChange}
            autoComplete="current-password"
            className="login-input"
          />
        </label>
        <button className="login-btn">Login</button>
      </form>
      </div>
      <section className="login-section">
      <button onClick={handleDemoSignIn} className="login-btn demo">Demo User</button>
        No Account? <Link to="/register" className="login-register-link">Register</Link>
      </section>
    </div>
  );
};

export default Login;
