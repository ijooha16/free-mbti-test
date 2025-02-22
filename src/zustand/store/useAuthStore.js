import { create } from "zustand";

const token = "token";
const userId = "userId";
const avatar = "avatar";
const nickname = "nickname";

const useAuthStore = create((set) => ({
  token: localStorage.getItem(token) || null,
  userId: localStorage.getItem(userId) || null,
  avatar: localStorage.getItem(avatar) || null,
  nickname: localStorage.getItem(nickname) || null,

  setUser: (userData) => {
    localStorage.setItem("token", userData.accessToken);
    localStorage.setItem("userId", userData.userId);
    localStorage.setItem("nickname", userData.nickname);
    set({
      token: userData.accessToken,
      userId: userData.userId,
      nickname: userData.nickname,
    });
  },
  setProfile: (avater) => {
    localStorage.setItem("avatar", avater);
    set({ avatar: avater });
  },
  logOut: () => {
    localStorage.removeItem(token);
    localStorage.removeItem(userId);
    localStorage.removeItem(avatar);
    localStorage.removeItem(nickname);
    set({ token: null, userId: null, avatar: null, nickname: null });
  },
}));

export default useAuthStore;
