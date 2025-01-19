import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "../Styles/nav.css"


const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!toggleLogin) setUser(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  }, [toggleLogin]);

  return (
    <div className="navbar-container">
      <h2>
        <Link style={{ textDecoration: "none" }} to="/dashboard">
        <h1 className="nav-h1" style={{textAlign: 'center'}}>Calculator App</h1>
        </Link>
      </h2>

      {!toggleLogin ? (
        <Link to={"/login"}>
          <span className="nav-login">Login</span>
        </Link>
      ) : (
        <div>
          {user && <span>Hello, {user.username.toUpperCase()}? | </span>}
          <Link onClick={handleLogout}>
            <span className="nav-logout">Logout</span>
          </Link>
        </div>
      )}
      <hr />
    </div>
  );
};

export default NavBar;
