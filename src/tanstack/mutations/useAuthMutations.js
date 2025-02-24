import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../client.js";
import { toast } from "react-toastify";
import useAuthStore from "../../zustand/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { login, updateProfile, register } from "../../api/auth";

//로그인
export const useLoginMuation = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: (userData) => {
      queryClient.invalidateQueries(["user"]);
      setUser(userData);
      navigate("/");
      toast.success("로그인 성공!");
      console.log("로그인 성공", userData);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "로그인 정보가 일치하지 않습니다");
      console.log("로그인 실패", error.response.data.message);
    },
  });
};

//프로필 업데이트
export const useUpdateProfileMutation = () => {
  const { setProfile } = useAuthStore();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userProfile"]);
      toast.success("프로필 수정 완료!");
      console.log("프로필 업데이트 성공", data);

      if (data.avatar) {
        setProfile(data.avatar);
        setProfile(data.avatar);
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message || "프로필 수정 실패!");
      console.log("프로필 업데이트 실패", error);
    },
  });
};

//회원가입
export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); //바로 업데이트
      navigate("/log-in");
      toast.success("회원가입 완료!"); // "회원가입 완료"
      console.log("회원가입 성공");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "회원가입 실패!");
      console.log("회원가입 실패", error);
    },
  });
};
