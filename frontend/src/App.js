import { GoogleOAuthProvider } from "@react-oauth/google";
import { Navigate, Route, Routes } from "react-router-dom";
import Becomehost from "./Pages/Becomehost";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Services from "./Pages/Services";
import Signup from "./Pages/Signup";
import Userexperi from "./Pages/Userexperi";

function App() {
  return (
    <GoogleOAuthProvider clientId="">

      <div className="min-h-screen bg-gray-50">
        
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />

          <Route path="/home" element={<Home />} />
          <Route path="/user-experience" element={<Userexperi />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
         <Route path="/host" element={<Becomehost/>}/>
        </Routes>

      </div>

    </GoogleOAuthProvider>
  );
}

export default App;
