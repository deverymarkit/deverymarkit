import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Splash from "../pages/splashPage/Splash"
import Login from "../pages/loginPage/Login"
//import LoginEmail from "../pages/loginPage/LoginEmail"
import Signup from "../pages/loginPage/Signup"
import Profile from "../pages/profilePage/Profile"

export default function Router() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    )
}