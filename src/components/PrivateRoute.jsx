//import { useAuth } from "context/Auth/AuthContext";
import { Navigate } from "react-router-dom";
//import { useUserStore } from "stores/UserStore";

const PrivateRoute = ({ children, roles }) => {
  //const user = useUserStore(s => s.user);

  /*
  if (roles && !roles.filter((element) => user.roles.includes(element)).length )
    return <Navigate to="/notFound" />;
  if (!user) return <Navigate to="/auth/login" />;
  */
 
  return children;
};

export default PrivateRoute;
