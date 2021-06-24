import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoggedInRoute from "./components/auth/LoggedInRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/folder/:folderId" component={Home} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <LoggedInRoute path="/register" component={SignUp} />
        <LoggedInRoute path="/login" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
