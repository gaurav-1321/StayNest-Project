import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Normal Signup
  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({})); // ✅ safe parse

      if (res.ok) {
        alert("Registered Successfully ✅");
        navigate("/login");
      } else {
        alert(data.msg || data.error || "Signup Failed ❌");
      }

    } catch (error) {
      console.error("Signup Error:", error);
      alert("Cannot connect to server ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Google Signup
  const handleGoogleSignup = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      alert("Google Signup Failed ❌");
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
        alert("Google Signup Successful ✅");

        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.msg || "Google Signup Failed ❌");
      }

    } catch (error) {
      console.error("Google Signup Error:", error);
      alert("Cannot connect to server ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-100 flex items-center justify-center px-4">

      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Image */}
        <div className="relative hidden md:block">
          <img
            src="/Animate.png"
            alt="Signup"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-10 text-white">
            <h1 className="text-4xl font-bold mb-3">
              Start Your Journey With StayNest
            </h1>
            <p className="text-gray-200 text-lg">
              Create your account and explore premium stays worldwide.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 md:p-14 flex flex-col justify-center">

          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Join StayNest and start booking amazing stays.
          </p>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-4 focus:ring-2 focus:ring-rose-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Create password"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-5 focus:ring-2 focus:ring-rose-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-xl font-semibold shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-7">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-400">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSignup}
              onError={() => alert("Google Signup Failed ❌")}
            />
          </div>

          {/* Login */}
          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-rose-500 font-semibold hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;
