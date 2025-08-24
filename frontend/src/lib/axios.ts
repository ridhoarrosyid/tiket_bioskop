import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_URL;

export const globalInstance = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
});
