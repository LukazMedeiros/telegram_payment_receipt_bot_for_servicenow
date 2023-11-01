import axios from "axios";

export const SERVICENOW = axios.create({
  auth: {
    username: process.env.LOGIN!,
    password: process.env.PASSWORD!,
  },
});
