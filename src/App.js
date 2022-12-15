import "./App.css";
import LoginMain from "./pages/loginPage/Login";
import Login from "./pages/loginPage/LoginEmail";
import Signup from "./pages/loginPage/Signup";
import ProfileSetting from "./pages/loginPage/ProfileSetting";
import Splash from "./pages/splashPage/Splash";
import Home from "./pages/homePage/Home";
import HomehasFollower from "./pages/homePage/HomehasFollower";
import Router from "./routes/Router";

function App() {
    return (
        <div className="App">
            <Router />
        </div>
    );
}
export default App;
