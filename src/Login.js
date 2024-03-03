import React, { useState, useContext } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Form, useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import { UserContext } from "./UserContext";
export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { user, updateCurrUser } = useContext(UserContext);

  const INITIAL_STATE = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await JoblyApi.login(formData);
      JoblyApi.token = res.token;
      window.localStorage.setItem("token", res.token);
      setFormData(INITIAL_STATE);
      updateCurrUser(res.token);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="mt-5">
      <div className="col-lg-4 offset-lg-4">
        <h3 className="title">Login</h3>
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username">Username </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  formAction="/profile"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  <p className="mb-0 small">{error}</p>
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
