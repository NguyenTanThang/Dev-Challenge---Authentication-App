import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import LogoutPage from "./pages/LogoutPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/logout" component={LogoutPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/sign-up" component={SignupPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
