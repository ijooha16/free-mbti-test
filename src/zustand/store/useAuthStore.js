import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  avatar: localStorage.getItem("avatar") || null,
  nickname: localStorage.getItem("nickname") || null,

  setUser: (userData) => {
    localStorage.setItem("token", userData.accessToken);
    localStorage.setItem("userId", userData.userId);
    localStorage.setItem("avatar", userData.avatar);
    localStorage.setItem("nickname", userData.nickname);
    set({
      token: userData.accessToken,
      userId: userData.userId,
      avatar: userData.avatar,
      nickname: userData.nickname,
    });
  },
  logOut: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("avatar");
    localStorage.removeItem("nickname");
    set({ token: null, userId: null, avatar: null, nickname: null });
  },
}));

export default useAuthStore;
