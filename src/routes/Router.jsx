import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "../pages/splashPage/Splash";
import Login from "../pages/loginPage/Login";
import LoginEmail from "../pages/loginPage/LoginEmail";
import Home from "../pages/homePage/Home";
import Upload from "../pages/uploadPage/Upload";
import ProfileSetting from "../pages/loginPage/ProfileSetting";
import Profile from "../pages/profilePage/Profile";
import Page404 from "../pages/Page404";
import Signup from "../pages/loginPage/Signup";
import PostDetail from "../pages/postPage/PostDetail";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/login" element={<Login />} />
                <Route path="/loginemail" element={<LoginEmail />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/upload" element={<Upload type = "upload"/>} />            
                <Route path="/profile/:accountname" element={<Profile />} />           
                <Route path="/profilesetting" element={<ProfileSetting />} />
                <Route path="/post/:postid" element={<PostDetail />} />           
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
        )
}