import React, { useEffect, useState, useContext } from "react";
import { CompanyCard } from "./CompanyCard";
import { Button } from "reactstrap";
import { v4 as uuid } from "uuid";
import JoblyApi from "./api";
import { Form, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const user = useContext(UserContext);

  if (!user) {
    <Navigate to="/" />;
  }

  useEffect(() => {
    async function getCompanies() {
      const res = await JoblyApi.getCompanies();
      setCompanies(res);
    }
    getCompanies();
  }, []);

  const searchCompanies = async () => {
    const res = await JoblyApi.filterCompanies(search);
    setCompanies(res);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mt-5">
      <div className="col-8 offset-md-2">
        <div className="mb-4">
          <Form method="get" onSubmit={searchCompanies}>
            <div className="row justify-content-start gx-0">
              <div className="col-8">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="name"
                  placeholder="Enter search term.."
                  onChange={handleChange}
                />
              </div>
              <div className="col-auto">
                <Button color="primary" size="lg">
                  Search
                </Button>
              </div>
            </div>
          </Form>
        </div>
        {companies.map((c) => (
          <li style={{ listStyle: "none" }} key={uuid()}>
            <CompanyCard name={c.name} desc={c.description} handle={c.handle} />
          </li>
        ))}
      </div>
    </div>
  );
};
