import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export default function LoggedInRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        !currentUser ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
