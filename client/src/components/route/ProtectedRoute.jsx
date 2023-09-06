import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
