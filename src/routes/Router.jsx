import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Splash from "../pages/splashPage/Splash"
import Login from "../pages/loginPage/Login"
<<<<<<< HEAD
//import LoginEmail from "../pages/loginPage/LoginEmail"
import Signup from "../pages/loginPage/Signup"
import Profile from "../pages/profilePage/Profile"
=======
import LoginEmail from "../pages/loginPage/LoginEmail"
import Signup from "../pages/loginPage/Signup"
>>>>>>> 5be8d0a1ac83a7a60947268cdb56706e55bfc591

export default function Router() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
<<<<<<< HEAD
            {/*<Route path="/loginemail" element={<LoginEmail />} />*/}
            <Route path="signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
=======
            <Route path="/loginemail" element={<LoginEmail />} />
            <Route path="signup" element={<Signup />} />
>>>>>>> 5be8d0a1ac83a7a60947268cdb56706e55bfc591
        </Routes>
      </BrowserRouter>
    )
}