import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
export const CompanyCard = ({ name, desc, handle, key }) => {
  return (
    <div>
      <div className="mb-3">
        <Link to={`/companies/${handle}`} style={{ textDecoration: "none" }}>
          <Card key={key}>
            <CardBody>
              <CardTitle tag="h6">{name}</CardTitle>
              <CardText>{desc}</CardText>
            </CardBody>
          </Card>
        </Link>
      </div>
    </div>
  );
};
