import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";

export const useGetUser = () => {
  const [currUser, setCurrUser] = useState(null);
  const [userToken, setToken] = useState(window.localStorage.token || null);

  useEffect(() => {
    async function getUser() {
      if (userToken) {
        JoblyApi.token = userToken;
        const decoded = jwtDecode(userToken);
        const user = await JoblyApi.getUser(decoded.username);
        setCurrUser(user.user);
      }
    }
    getUser();
  }, [userToken]);

  console.log("curruser:", currUser);
};
