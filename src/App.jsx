import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  </Router>
);

const App = () => {
  return <div className="max-w-screen-2xl mx-auto">{routes}</div>;
};

export default App;
