import axios from "axios";

const API_URL = "https://www.nbcamp-react-auth.link";

const api = axios.create({
  baseURL: API_URL,
  // timeout: 5000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

//모든 요청에 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 요청 헤더에 추가
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//인증 오류 시 자동 로그아웃
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   console.error("인증 오류: 다시 로그인하세요.");
    //   localStorage.removeItem("accessToken");
    //   window.location.href = "/log-in"; // 로그인 페이지로 이동
    // }
    return Promise.reject(error.response);
  }
);

export default api;
