import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Form, redirect, useActionData } from "react-router-dom";
import JoblyApi from "./api";

export const Login = () => {
  let data = useActionData();
  return (
    <div className="mt-5">
      <div className="col-lg-4 offset-lg-4">
        <h3 className="title">Login</h3>
        <Card>
          <CardBody>
            <Form method="post" action="/login">
              <div className="mb-3">
                <label htmlFor="username">Username </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  formAction="/profile"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                />
              </div>

              {data?.error && (
                <div className="alert alert-danger" role="alert">
                  <p className="mb-0 small">{data.error}</p>
                </div>
              )}

              <div className="d-grid">
                <Button className="fw-bold" color="primary">
                  Submit
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export const LoginFormAction = async ({ request }) => {
  const data = await request.formData();
  const submission = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    const res = await JoblyApi.login(submission);
    JoblyApi.token = res.token;
    window.localStorage.setItem("token", res.token);
  } catch (err) {
    return { error: err };
  }

  return redirect("/");
};
