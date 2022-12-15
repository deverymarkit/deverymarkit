import "./App.css";
import LoginMain from "./pages/loginPage/LoginMain";
import Login from "./pages/loginPage/Login";
import Signup from "./pages/loginPage/Signup";
import ProfileSetting from "./pages/loginPage/ProfileSetting";
import Splash from "./pages/splashPage/Splash";
import Home from "./pages/homePage/Home";
import HomehasFollower from "./pages/homePage/HomehasFollower";

function App() {
    return (
        <div className="App">
            <HomehasFollower />
        </div>
    );
}
export default App;
