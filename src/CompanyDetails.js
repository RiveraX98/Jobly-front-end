import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { JobCard } from "./JobCard";
import JoblyApi from "./api";
import { UserContext } from "./UserContext";

export const CompanyDetails = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    async function getCompany() {
      const res = await JoblyApi.getCompany(handle);
      setCompany(res);
    }
    getCompany();
  }, []);

  return (
    <div>
      {company ? (
        <div className="mt-5">
          <div className="col-8 offset-md-2">
            <div>
              <h4 className="title">{company.name}</h4>
              <p className="title">{company.description}</p>
            </div>

            {company.jobs.map((job) => (
              <li style={{ listStyle: "none" }} key={job.id}>
                <JobCard
                  id={job.id}
                  salary={job.salary}
                  equity={job.equity}
                  title={job.title}
                  user={user}
                />
              </li>
            ))}
          </div>
        </div>
      ) : (
        <h1>"Loading..."</h1>
      )}
    </div>
  );
};
