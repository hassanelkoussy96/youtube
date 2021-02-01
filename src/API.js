import axios from "axios";

export default axios.create({
  baseURL: `https://www.googleapis.com/youtube/v3/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: "JWT " + localStorage.getItem("token")
  }
});
