import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoggedInRoute from "./components/auth/LoggedInRoute";

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <LoggedInRoute path="/register" component={SignUp} />
        <LoggedInRoute path="/login" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
