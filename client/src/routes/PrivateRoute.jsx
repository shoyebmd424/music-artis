import { Navigate } from "react-router-dom";
import { getUser } from "../service/auth/authentication";

const PrivateRoute = ({ children }) => {

    // const isAuthenticated=true;
    const isAuthenticated=getUser()?.token;
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
