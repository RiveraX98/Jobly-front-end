import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import JoblyApi from "./api";

export const JobCard = ({ title, salary, equity, company, id, user }) => {
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    function checkApplied(id) {
      if (id in user.applications) {
        setApplied(true);
      }
    }

    checkApplied(id);
  }, []);

  async function apply(username, jobId) {
    await JoblyApi.apply(username, jobId);
    setApplied(true);
  }

  return (
    <div className="mb-3">
      <Card>
        <CardBody>
          <CardTitle tag="h6">{title}</CardTitle>
          <CardText>{company}</CardText>

          <div>
            <small>Salary: {salary}</small>
          </div>
          <div>
            <small>Equity: {equity}</small>
          </div>

          <div className="float-end">
            <Button
              className="fw-bold"
              color="danger"
              onClick={() => apply(user.username, id)}
              disabled={applied}
            >
              {applied ? "APPLIED" : "APPLY "}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
