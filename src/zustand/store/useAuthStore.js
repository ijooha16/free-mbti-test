import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,

  setUser: (userData) => {
    localStorage.setItem("token", userData.accessToken);
    localStorage.setItem("userId", userData.userId);
    set({ token: userData.accessToken, userId: userData.userId });
  },

  logOut: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    set({ token: null, userId: null });
  },
}));

export default useAuthStore;
