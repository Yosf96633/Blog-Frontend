import React from "react";
import { Signup, Login, Home, Data } from "./Pages/page";
import { Routes, Route, useLocation, Navigate } from "react-router";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./Zustand/store";
import { Header } from "./Components/index";
const App = () => {
  const location = useLocation(); // Keep track of the current location for animations
  const { user } = useAuth();
  return (
    <div className="bg-[#232D3F] text-white relative z-20">
        <Header/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to={"/login"} />}
          ></Route>
          <Route path="/login" element={user ? <Navigate to={"/"}/> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to={"/"}/> :<Signup />} />
          <Route path="/signup/:id" element={user ? <Navigate to={"/"}/> :<Data />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
