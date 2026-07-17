import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import Loading from "./Loading";

function AuthLayout({ children, authentication = true, loading = false }) {
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();

  if (loading) {
    return <Loading message="Checking session..." />;
  }

  if (authentication && !authStatus) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!authentication && authStatus) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthLayout;
