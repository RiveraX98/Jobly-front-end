import React, { useContext } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Form, useActionData, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import JoblyApi from "./api";

export const ProfileCard = () => {
  const user = useContext(UserContext);
  const { username } = useParams();
  const data = useActionData();

  return (
    <div className="mt-5">
      <div className="col-lg-4 offset-lg-4">
        <h3 className="title">Profile</h3>
        <Card>
          <CardBody>
            <Form method="post" action={`/profile/${username}`}>
              <div className="mb-3">
                <label htmlFor="username">Username </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder={user.username}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label htmlFor="firstName">First Name </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="form-control"
                  defaultValue={user.firstName}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="form-control"
                  defaultValue={user.lastName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="form-control"
                  defaultValue={user.email}
                />
              </div>

              {data?.success && (
                <div className="alert alert-success" role="alert">
                  <p className="mb-0 small">{data.success}</p>
                </div>
              )}

              {data?.error && (
                <div className="alert alert-danger" role="alert">
                  <p className="mb-0 small">{data.error}</p>
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

export const EditProfileAction = async ({ params, request }) => {
  const data = await request.formData();
  const submission = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
  };

  try {
    const res = await JoblyApi.editUser(params.username, submission);
  } catch (err) {
    return { error: err };
  }

  return { success: "Updated successfully" };
};
