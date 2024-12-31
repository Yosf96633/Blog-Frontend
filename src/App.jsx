import React from "react";
import { Signup, Login, Home, Data } from "./Pages/page";
import { Routes, Route, NavLink, useLocation, Navigate } from "react-router";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./Zustand/store";

const App = () => {
  const location = useLocation(); // Keep track of the current location for animations
  const { user } = useAuth();
  return (
    <div className="bg-[#232D3F] text-white">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/:id" element={<Data />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
