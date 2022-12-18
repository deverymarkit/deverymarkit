import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Splash from "../pages/splashPage/Splash"
import Login from "../pages/loginPage/Login"
import LoginEmail from "../pages/loginPage/LoginEmail"
import Signup from "../pages/loginPage/Signup"
import ProfileSetting from "../pages/loginPage/ProfileSetting"

export default function Router() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginemail" element={<LoginEmail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profilesetting" element={<ProfileSetting />} />
        </Routes>
      </BrowserRouter>
    )
}