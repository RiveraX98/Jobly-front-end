import "./Jobly.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "./UserContext";
import { Homepage } from "./Homepage";
import { Logout } from "./Logout";
import { CompanyList } from "./CompanyList";
import { CompanyDetails } from "./CompanyDetails";
import { Jobs } from "./Jobs";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { EditProfileAction, ProfileCard } from "./ProfileCard";
import JoblyApi from "./api";
import Root from "./Root";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [userToken, setUserToken] = useState(window.localStorage.token);

  useEffect(() => {
    async function getUser() {
      if (userToken) {
        JoblyApi.token = userToken;
        const decoded = jwtDecode(userToken);
        const user = await JoblyApi.getUser(decoded.username);
        setCurrUser(user.user);
      } else {
        setCurrUser(null);
      }
    }
    getUser();
  }, [userToken]);

  console.log("curruser:", currUser);

  const updateCurrUser = async (token) => {
    setUserToken(token);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route exact path="/" element={<Root />}>
        <Route index element={<Homepage />} />
        <Route
          path="/profile/:username"
          element={<ProfileCard />}
          action={EditProfileAction}
        />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:handle" element={<CompanyDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <UserContext.Provider value={{ currUser, updateCurrUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
