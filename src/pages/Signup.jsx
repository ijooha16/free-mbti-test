import AuthForm from "../components/AuthForm";
import Btn from "../components/Btn.jsx";
import { toast } from "react-toastify";
import Title from "../components/layout/Title.jsx";
import { useRegisterMutation } from "../tanstack/mutations/useAuthMutations.js";

const Signup = () => {
  const { mutate: register } = useRegisterMutation();

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
    register({ id, nickname, password });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <Title title="회원가입" />
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
      <div className="text-subgray text-center mt-[30px] leading-relaxed">
        이미 계정이 있으신가요? <br />
        <a href="/log-in">로그인 하러 가기</a>
      </div>
    </div>
  );
};

export default Signup;
