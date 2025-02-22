import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Btn from "../components/Btn";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import useAuthStore from "../zustand/store/useAuthStore";
import { queryClient } from "../api/client";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (userData) => {
      setUser(userData);
      toast.success("로그인 성공!");
      navigate("/");
      queryClient.invalidateQueries(["user"]);
    },
    OnError: (error) => {
      toast.error(error.response.data.message || "로그인 정보가 일치하지 않습니다");
      console.log(error, "로그인 실패");
    },
  });

  const submitHandler = (e) => {
    // 기본 제출 이벤트 방지
    e.preventDefault();

    //폼 데이터
    const formData = new FormData(e.target);
    const id = formData.get("id");
    const password = formData.get("password");

    //mutate
    mutation.mutate({ id, password });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[40px]">
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col justify-center items-center gap-[20px]"
      >
        <AuthForm type="text" name="id" placeHolder="아이디" />
        <AuthForm type="password" name="password" placeHolder="비밀번호" />
        <Btn type="submit" text="로그인" />
      </form>
      <Link
        to={"/sign-up"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="text-subgray">회원가입</div>
      </Link>
    </div>
  );
};

export default Login;
