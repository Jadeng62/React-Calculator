import { useOutletContext, Link } from "react-router-dom";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  return (
    <div>
      {user && (
        <h1>
          Welcome, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}
        </h1>
      )}

      <div className="dashboard-container">
        <h2 className="dashboard-h2">Please select an option below</h2>
        <main className="dashboard-main">
          <ul className="dashboard-ul">
           <Link to="/calculations"> <li className="dashboard-li">Compute</li></Link> 
            <Link to="/history"><li className="dashboard-li">History</li></Link> 
          </ul>
        </main>
      </div>


      <button onClick={handleLogout} className="dashboard-btn logout">Logout</button>
    </div>
  );
};

export default Dashboard;
