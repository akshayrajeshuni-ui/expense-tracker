import React, { useState } from "react";
import axios from "axios";

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://expense-tracker-backend-a0cg.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "100px auto" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;