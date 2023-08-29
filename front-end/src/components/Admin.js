import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  //    useEffect(()=>{
  //     const auth = localStorage.getItem('user1');
  //     if(auth)
  //     {
  //         navigate('/')
  //     }
  //    })
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const collectData = async () => {
    console.log(username, password);
    let result = await fetch("http://localhost:5000/admin", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    console.warn(result);
    if (result.username) {
      localStorage.setItem("user1", JSON.stringify(result));
      navigate("/add");
    } else {
      alert("please enter valid field");
    }
  };
  return (
    <div className="form">
      <h1>Admin Login</h1>

      <input
        className="inputBox"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter admin username"
      />

      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter admin password"
      />

      <button className="btn" onClick={collectData} type="button">
        Admin Login
      </button>
    </div>
  );
};

export default AdminLogin;
