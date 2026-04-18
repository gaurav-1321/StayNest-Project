import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("Login Successful");
      navigate("/");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-96 bg-white p-8 shadow-lg rounded-xl">

        <h2 className="text-3xl font-bold mb-6">Login</h2>

        <input
          className="border w-full p-2 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border w-full p-2 mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full p-2 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          New User?{" "}
          <Link to="/signup" className="text-rose-500 font-semibold">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
