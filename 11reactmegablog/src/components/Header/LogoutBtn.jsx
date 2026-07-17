import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import Button from "../Button";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    await authService.logout();
    dispatch(logout());
    navigate("/login");
  }

  return (
    <Button type="button" variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutBtn;
