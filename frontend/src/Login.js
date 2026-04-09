import React, { useState } from "react";
import axios from "axios";

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async () => {
    try {
      const url = isRegister
        ? "https://expense-tracker-backend-a0cg.onrender.com/api/auth/register"
        : "https://expense-tracker-backend-a0cg.onrender.com/api/auth/login";

      const res = await axios.post(url, { email, password });

      // ✅ If Register → switch to login
      if (isRegister) {
        alert("Registered successfully. Please login.");
        setIsRegister(false);
        return;
      }

      // ✅ If Login → save token
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);

    } catch (err) {
      alert(err.response?.data || "Error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">

        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p className="text-sm text-center mt-3">
          {isRegister ? "Already have an account?" : "New user?"}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 cursor-pointer ml-1"
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;