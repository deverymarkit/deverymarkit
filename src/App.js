import "./App.css";
import LoginMain from "./pages/loginPage/Login";
import Login from "./pages/loginPage/LoginEmail";
import Signup from "./pages/loginPage/Signup";
import ProfileSetting from "./pages/loginPage/ProfileSetting";
import Splash from "./pages/splashPage/Splash";
import Home from "./pages/homePage/Home";
import HomehasFollower from "./pages/homePage/HomehasFollower";
import Router from "./routes/Router";
import Search from "./pages/searchPage/Search";

function App() {
    return (
        <div className="App">
            <Search />
        </div>
    );
}
export default App;
