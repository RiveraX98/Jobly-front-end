import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import JoblyApi from "./api";
import { UserContext } from "./UserContext";

export const Logout = () => {
  const { user, updateCurrUser } = useContext(UserContext);

  window.localStorage.removeItem("token");
  JoblyApi.token = "";

  updateCurrUser(null);

  return <Navigate to="/" />;
};
