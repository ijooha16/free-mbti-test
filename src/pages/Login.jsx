import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Btn from "../components/Btn";
import Title from "../components/layout/Title";
import { useLoginMuation } from "../tanstack/mutations/useAuthMutations";

const Login = () => {
  const { mutate: login } = useLoginMuation();

  //로그인
  const submitHandler = (e) => {
    e.preventDefault();

    //폼 데이터
    const formData = new FormData(e.target);
    const id = formData.get("id");
    const password = formData.get("password");

    //로그인 요청
    login({ id, password });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[40px]">
      <Title title="로그인" />
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col justify-center items-center gap-[20px]"
      >
        <AuthForm type="text" name="id" placeHolder="아이디" />
        <AuthForm type="password" name="password" placeHolder="비밀번호" />
        <Btn type="submit" text="로그인" />
      </form>
      <Link to={"/sign-up"} className="no-underline text-inherit">
        <div className="text-subgray">회원가입</div>
      </Link>
    </div>
  );
};

export default Login;
