import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/AuthSlice';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../assets/styles/Home.css";

const Home = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(isAuthenticated, user);

  // ✅ useEffect to handle redirect properly
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  function handleLogout() {
    dispatch(logout())
    alert("logout success")
    navigate("/");
  }
  return (
    <>
      {/* header */}
      <header className="header">
        <h1>Cable Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      {/* side bar */}
      <div className="main">
        <aside className="sidebar">
          <NavLink to="/home/list-customer" className="link">List Customer</NavLink>
          <NavLink to="/home/add-customer" className="link">Add Customer</NavLink>
          <NavLink to="/home/plans" className="link">Plans</NavLink>
          <NavLink to="/home/payments" className="link">Payments</NavLink>
        </aside>

        <section className="content">
          <Outlet /> {/* nested route content appears here */}
        </section>
      </div>

    </>
  )
}

export default Home