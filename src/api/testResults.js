import axios from "axios";

const API_URL = import.meta.env.VITE_MBTI;

const api = axios.create({
  baseURL: API_URL,
});

export const getTestResults = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

export const createTestResult = async (resultData) => {
  const response = await api.post(API_URL, resultData);
  return response.data;
};

export const deleteTestResult = async (id) => {
  const response = await api.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await api.patch(`${API_URL}/${id}`, { visibility });
  return response.data;
};
