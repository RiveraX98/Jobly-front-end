import React, { useEffect, useContext, useState } from "react";
import { JobCard } from "./JobCard";
import { Button } from "reactstrap";
import JoblyApi from "./api";
import { Form, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const Jobs = () => {
  const user = useContext(UserContext);

  console.log("JOB User", user);
  if (!user.currUser) {
    <Navigate to="/" />;
  }

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getJobs() {
      const res = await JoblyApi.getJobs();
      setJobs(res);
    }
    getJobs();
  }, []);

  const searchJobs = async () => {
    const res = await JoblyApi.filterJobs(search);
    setJobs(res);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mt-5">
      <div className="col-8 offset-md-2">
        <div className="mb-4">
          <Form method="get" onSubmit={searchJobs}>
            <div className="row justify-content-start gx-0">
              <div className="col-8">
                <input
                  className="form-control form-control-lg"
                  name="searchTerm"
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
        {jobs.map((job) => (
          <li style={{ listStyle: "none" }} key={job.id}>
            <JobCard
              user={user.currUser}
              id={job.id}
              salary={job.salary}
              equity={job.equity}
              title={job.title}
              company={job.companyName}
            />
          </li>
        ))}
      </div>
    </div>
  );
};
