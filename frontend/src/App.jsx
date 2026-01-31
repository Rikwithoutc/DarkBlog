import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import LoginPage from "./pages/LogIn";
import Posts from "./pages/AllPost";
import SplineComponent from "./components/Spline";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/all-post" element={<Posts />} />
      </Routes>
    </div>
  );
};

export default App;
