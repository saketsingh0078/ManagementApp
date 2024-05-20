import { Signup } from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  
  const [user, setUser] = useState(null);
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
