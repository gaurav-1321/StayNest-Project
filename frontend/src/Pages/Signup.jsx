import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
     const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.status === 201) {
      alert("Registered Successfully");
      navigate("/login");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-96 bg-white p-8 shadow-lg rounded-xl">

        <h2 className="text-3xl font-bold mb-6">Signup</h2>

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
          onClick={handleSignup}
          className="bg-rose-500 text-white w-full p-2 rounded"
        >
          Create Account
        </button>

        <p className="mt-4 text-center">
          Already Registered?{" "}
          <Link to="/login" className="text-black font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
