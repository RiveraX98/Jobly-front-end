import React, { useContext, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Form, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import JoblyApi from "./api";

export const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { user, updateCurrUser } = useContext(UserContext);

  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
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
      const res = await JoblyApi.register(formData);
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
        <h3 className="title">Sign Up</h3>
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username">Username </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="username">Password </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="firstName">First Name </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
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
                  Save Changes
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

// export const RegisterFormAction = async ({ request }) => {
//   const data = await request.formData();
//   const submission = {
//     username: data.get("username"),
//     password: data.get("password"),
//     firstName: data.get("firstName"),
//     lastName: data.get("lastName"),
//     email: data.get("email"),
//   };

//   try {
//     const res = await JoblyApi.register(submission);
//     JoblyApi.token = res.token;
//     window.localStorage.setItem("token", res.token);
//   } catch (err) {
//     return { error: err };
//   }

//   return redirect("/");
// };
