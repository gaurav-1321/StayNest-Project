import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Userexperi from "./Pages/Userexperi";
function App() {
  return (
    <GoogleOAuthProvider clientId="426982018132-9sjqbjknrfim3e3taeu1fq7ph3atfe2j.apps.googleusercontent.com">
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-experience" element={<Userexperi/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </GoogleOAuthProvider>
  );
}

export default App;
