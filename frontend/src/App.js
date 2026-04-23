import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Services from "./Pages/Services";
import Signup from "./Pages/Signup";
import Userexperi from "./Pages/Userexperi";
import Navbar from "./components/Navbar";

function App() {
  return (
    <GoogleOAuthProvider clientId="426982018132-9sjqbjknrfim3e3taeu1fq7ph3atfe2j.apps.googleusercontent.com">
      
      <div className="relative min-h-screen">

        {/* 🌄 Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-img.png')" }}
        ></div>

        {/*  Blur + Overlay */}
        <div className="fixed inset-0 backdrop-blur-md bg-black/30"></div>

        {/* App Content */}
        <div className="relative z-10">
          <Routes>
            <Route path="/nav" element={<Navbar/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/user-experience" element={<Userexperi />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>

      </div>

    </GoogleOAuthProvider>
  );
}

export default App;
