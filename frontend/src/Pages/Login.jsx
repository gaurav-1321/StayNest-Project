import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Normal Login
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        alert("Login Successful ✅");

        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.message || "Login Failed ❌");
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("Cannot connect to server ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Google Login
  const handleGoogleLogin = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      alert("Google Login Failed ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        alert("Google Login Successful ✅");

        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.msg || "Google Login Failed ❌");
      }

    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Cannot connect to server ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-slate-100 flex items-center justify-center px-4">

      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden md:block">
          <img
            src="/Animate.png"
            alt="StayNest"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-10 text-white">
            <h1 className="text-4xl font-bold mb-3 leading-tight">
              Discover Luxury <br /> Stays With StayNest
            </h1>

            <p className="text-gray-200 text-lg">
              Book premium homes, villas and experiences worldwide.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-14 flex flex-col justify-center">

          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mb-8">
            Login to continue your journey.
          </p>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-4 focus:ring-2 focus:ring-rose-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-3 focus:ring-2 focus:ring-rose-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Forgot */}
          <div className="text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-rose-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:scale-[1.02] text-white py-4 rounded-xl font-semibold shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-7">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-400">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => alert("Google Login Failed ❌")}
            />
          </div>

          {/* Signup */}
          <p className="text-center mt-8 text-gray-600">
            New User?{" "}
            <Link
              to="/signup"
              className="text-rose-500 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
