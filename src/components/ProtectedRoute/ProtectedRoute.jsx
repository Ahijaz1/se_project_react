import { Navigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const { currentUser } = useContext(CurrentUserContext);

  // Use isLoggedIn prop or check if currentUser exists
  const isAuthenticated = isLoggedIn || !!currentUser;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
