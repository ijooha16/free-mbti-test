import api from "./api";

export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post("/login", userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get("/user");

  return response.data;
};

export const updateProfile = async (formData) => {
  const token = "accessToken";

  const response = await api.patch("/profile", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(token)}`,
    },
  });

  return response.data;
};
