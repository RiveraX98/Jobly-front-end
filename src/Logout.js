import { Navigate } from "react-router-dom";
import JoblyApi from "./api";

export const Logout = () => {
  window.localStorage.removeItem("token");
  JoblyApi.token = " ";

  return <Navigate to="/" />;
};
