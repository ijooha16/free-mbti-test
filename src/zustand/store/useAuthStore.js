import { create } from "zustand";

const token = "token";
const userId = "userId";
const avatar = "avatar";
const nickname = "nickname";

const initialState = {
  token: localStorage.getItem(token) || null,
  userId: localStorage.getItem(userId) || null,
  avatar: localStorage.getItem(avatar) || null,
  nickname: localStorage.getItem(nickname) || null,
};

const useAuthStore = create((set) => ({
  ...initialState,

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
    set(initialState);
  },
}));

export default useAuthStore;
