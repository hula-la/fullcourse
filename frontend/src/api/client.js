import axios from "axios";

const client = axios.create({
  baseURL: "https://127.0.0.1:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
