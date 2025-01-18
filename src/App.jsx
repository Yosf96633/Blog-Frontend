import React from "react";
import { Signup, Login, Home, Data, Search, Profile } from "./Pages/page";
import { Routes, Route, useLocation, Navigate } from "react-router";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./Zustand/store";
import { Header } from "./Components/index";
const App = () => {
  const location = useLocation(); 
  const { user } = useAuth();
  return (
    <div className="bg-[#232D3F] text-white overflow-x-hidden">
        <Header/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to={"/login"} />}
          ></Route>
          <Route path="/login" element={user ? <Navigate to={"/"}/> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to={"/"}/> :<Signup />} />
          <Route path="/search" element={user ? <Search/> : <Login/>}/>
          <Route path="/profile/:id" element={user ? <Profile/> :  <Login/>}/>
          <Route path="/signup/:id" element={user ? <Navigate to={"/"}/> :<Data />} />
        </Routes>
      </AnimatePresence>
      
    </div>
  );
};
export default App;
