import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3001/",
  baseURL: "https://gemini-back.onrender.com/",
});

export default api;
