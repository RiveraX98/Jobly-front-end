import React, { useContext } from "react";
import { Button, Container } from "reactstrap";
import { UserContext } from "./UserContext";

export const Homepage = () => {
  const user = useContext(UserContext);

  return (
    <div className="pt-5">
      <div className="Homepage">
        <Container className="text-center">
          <div>
            <h1 className="title mb-4 fw-bold">Jobly</h1>
            <p className="title lead">All jobs in one, convenient place.</p>
            {user.currUser ? (
              <h2 className="title">
                Welcome Back, {user.currUser.firstName}!{" "}
              </h2>
            ) : (
              <div>
                <Button className="me-3 fw-bold" color="primary" href="/login">
                  Login
                </Button>
                <Button className="fw-bold" color="primary" href="/signup">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};
