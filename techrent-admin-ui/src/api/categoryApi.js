// src/api/categoryApi.js
import api from "./axios";

export const getCategories = () => api.get("/v1/category/magic");

export const createCategory = (data) =>
  api.post("/v1/category/create", data);

export const updateCategory = (id, data) =>
  api.put(`/v1/category/${id}/magic`, data);

export const deleteCategory = (id) =>
  api.delete(`/v1/category/${id}/magic`);
