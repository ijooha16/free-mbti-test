import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://www.nbcamp-react-auth.link";

const api = axios.create({
  baseURL: API_URL,
});

//모든 요청에 토큰 자동 추가, 인증 오류시 자동 로그아웃 후 로그인 페이지
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 요청 헤더에 추가
    }
    return config;
  },
  (error) => {
    // 서버에서 응답이 있는 경우 (error.response 있을 떄)
    if (error.response) {
      return Promise.reject(error);
    }
    //네트워크 오류
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      window.location = "/log-in";
    }, 1000);
    toast.error("토큰 만료! 다시 로그인하세요.");
    return Promise.reject(error);
  }
);

export default api;
