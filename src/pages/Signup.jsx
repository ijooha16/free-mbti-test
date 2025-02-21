import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";
import { queryClient } from "../api/client.js";
import AuthForm from "../components/AuthForm";
import Btn from "../components/Btn.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  //회원가입 요청
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); //바로 업데이트
      toast.success("회원가입 완료!"); // "회원가입 완료"
      navigate("/log-in");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "회원가입 실패!");
    },
  });

  const submitHandler = (e) => {
    // 기본 제출 이벤트 방지
    e.preventDefault();

    console.log("회원가입 제출");

    //폼 데이터
    const formData = new FormData(e.target);
    const id = formData.get("id");
    const nickname = formData.get("nickname");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");

    //비밀번호 재확인
    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    //데이터 변경
    mutation.mutate({ id, nickname, password });
  };

  return (
    <div>
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col justify-center items-center gap-[20px]"
      >
        <AuthForm type="text" name="id" placeHolder="아이디" />
        <AuthForm type="text" name="nickname" placeHolder="닉네임" />
        <AuthForm type="password" name="password" placeHolder="비밀번호" />
        <AuthForm
          type="password"
          name="confirm_password"
          placeHolder="비밀번호 확인"
        />
        <Btn type="submit" text="가입하기" />
      </form>
    </div>
  );
};

export default Signup;
