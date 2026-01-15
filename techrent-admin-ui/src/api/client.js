// src/api/client.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://209.97.161.90:6002",
});

// প্রতি request এর আগে token header এ যোগ করবে
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
