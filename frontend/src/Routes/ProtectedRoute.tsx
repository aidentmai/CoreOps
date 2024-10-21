import React from "react";
import { UseAuth } from "../Context/UseAuth";
import { Navigate, useLocation } from "react-router-dom";

type Props = { children: React.ReactNode};

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = UseAuth();
  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;