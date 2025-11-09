import React, { useState } from "react";
import "../assets/styles/Login.css";
import { login } from "../slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Login = () => {

  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate()

  let dispatch = useDispatch()

  // console.log(userName,password);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName == "ags" && password == "1") {
      dispatch(login());
      navigate("/home/list-customer");
      // console.log("user loggged");

    }
    else {
      alert("Invalid userName or password");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username"
            value={userName}
            onChange={(e) => { setUserName(e.target.value) }}
            required />

          <input type="password" placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            required />
          <button type="submit" >Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
