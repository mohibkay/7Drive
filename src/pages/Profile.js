import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAuth } from "../context/authContext";

export default function Profile() {
  const { signOut } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await signOut();
    history.push("/login");
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
