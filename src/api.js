import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? {} : data;

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of all companies.
   * searchFilters (all optional):
   * - minEmployees
   * - maxEmployees
   * - name (will find case-insensitive, partial matches)
   */

  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** Filter companies by name.
   * searchFilter :
   * - name (will find case-insensitive, partial matches)
   */

  static async filterCompanies(name) {
    let res = await this.request(`companies?name=${name}`);
    return res.companies;
  }

  /** Get a list of all jobs.
   * Can provide search filter in query:
   * - minSalary
   * - hasEquity (true returns only jobs with equity > 0, other values ignored)
   * - title (will find case-insensitive, partial matches) */

  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  /** Filter companies by title.
   * searchFilter :
   * - title (will find case-insensitive, partial matches)
   */

  static async filterJobs(title) {
    let res = await this.request(`jobs?title=${title}`);
    return res.jobs;
  }

  /** Get details on a job by id. */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** POST /auth/register:
   * Must include { username, password, firstName, lastName, email }
   * Returns JWT token which can be used to authenticate further requests.
   */

  static async register(data) {
    let token = await this.request("auth/register", data, "post");
    return token;
  }

  /** POST /auth/token:  { username, password } => { token }
   * Returns JWT token which can be used to authenticate further requests.
   */

  static async login(data) {
    let token = await this.request("auth/token", data, "post");
    return token;
  }

  /** POST /[username]/jobs/[id]  { state } => { application }
   * Returns {"applied": jobId}
   * Authorization required: admin or same-user-as-:username
   * */

  static async apply(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res;
  }

  /** GET user details by username
   * Returns { username, firstName, lastName, isAdmin, jobs }
   * Authorization required: admin or same user-as-:username
   **/

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  /** PATCH { user } => { user }
   * Data can include:
   *   { firstName, lastName, password, email }
   * Returns { username, firstName, lastName, email, isAdmin }
   * Authorization required: admin or same-user-as-:username
   **/

  static async editUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res;
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
