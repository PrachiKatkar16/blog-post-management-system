import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-post-management-system-4.onrender.com/api/posts",
});

export const getPosts = (page = 1, limit = 5) => {
  return API.get(`/?page=${page}&limit=${limit}`);
};

export const getPostById = (id) => {
  return API.get(`/${id}`);
};

export const createPost = (postData) => {
  return API.post("/", postData);
};

export const updatePost = (id, postData) => {
  return API.put(`/${id}`, postData);
};

export const deletePost = (id) => {
  return API.delete(`/${id}`);
};

// Search posts with keyword, category, and status
export const searchPosts = (keyword = "", category = "", status = "") => {
  const params = new URLSearchParams();
  if (keyword) params.append("keyword", keyword);
  if (category) params.append("category", category);
  if (status) params.append("status", status);
  return API.get(`/search?${params.toString()}`);
};

// Export CSV with optional filters
export const exportCSV = (keyword = "", category = "", status = "") => {
  const params = new URLSearchParams();
  if (keyword) params.append("keyword", keyword);
  if (category) params.append("category", category);
  if (status) params.append("status", status);
  const url = `http://localhost:5000/api/posts/export?${params.toString()}`;
  window.open(url, "_blank");
};