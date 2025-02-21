import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/store/useAuthStore";

const Header = () => {
  const { token, logOut } = useAuthStore();
  const isLogin = !!token;
  const navigate = useNavigate();

  const logoutHandler = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="p-[0_60px] w-screen h-[200px] fixed top-[0] flex justify-between items-center">
      <div className="w-[200px]"></div>
      <Link to={"/"} className="no-underline h-[80px] text-[52px] font-bold">
        MBTI TEST
      </Link>

      {isLogin ? (
        <div className="flex">
          <Link
            to={"/profile"}
            className="no-underline h-[80px] w-[100px] flex justify-end items-end text-right"
          >
            마이페이지
          </Link>
          <Link
            to={"/"}
            onClick={logoutHandler}
            className="no-underline h-[80px] w-[100px] flex justify-end items-end text-right"
          >
            로그아웃
          </Link>
        </div>
      ) : (
        <Link
          to={"/log-in"}
          className="no-underline h-[80px] w-[200px] flex justify-end items-end text-right"
        >
          로그인 / 회원가입
        </Link>
      )}
    </div>
  );
};

export default Header;
