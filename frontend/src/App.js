import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
function App() {
  return (
    <GoogleOAuthProvider clientId="426982018132-9sjqbjknrfim3e3taeu1fq7ph3atfe2j.apps.googleusercontent.com">
      
    <Home />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </GoogleOAuthProvider>
  );
}

export default App;
