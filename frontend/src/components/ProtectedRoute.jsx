import { Navigate } from "react-router-dom";


function ProtectedRoute({ children, allowedRole }) {


  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");



  // Not logged in

  if (!token) {

    return <Navigate to="/" />;

  }



  // Wrong role

  if (allowedRole && role !== allowedRole) {

    return <Navigate to="/dashboard" />;

  }



  return children;

}


export default ProtectedRoute;