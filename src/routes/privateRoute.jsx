import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const providerState = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!providerState.authState.isAuth) {
      return navigate("/login");
    }
  }, []);

  return children;
};
