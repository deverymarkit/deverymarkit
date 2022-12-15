import "./App.css";
import Profile from "./pages/profilePage/Profile";
import BasicHeader from "./components/common/header/BasicHeader";
import Navbar from "./components/common/navbar/Navbar";

function App() {
	return (
		<div className="App">
			<BasicHeader/>
				<Profile />
			<Navbar/>
		</div>
	);
}
export default App;