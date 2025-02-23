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
    <div className="p-[0_60px] w-screen h-[140px] md:h-[200px] fixed top-[0] flex flex-col md:flex-row md:justify-between items-center bg-white">
      <div className="w-[200px]"></div>
      <Link
        to={"/"}
        className="no-underline h-[68px] md:h-[80px] text-[42px] md:text-[52px] font-bold mt-[20px]"
      >
        MBTI TEST
      </Link>

      {/* 로그인 여부에 따라 바뀌는 탭 */}
      {isLogin ? (
        <div className="flex gap-[20px] md:gap-[0px]">
          <Link
            to={"/profile"}
            className="text-subgray no-underline md:h-[80px] md:w-[80px] flex justify-end items-end text-center md:text-right"
          >
            마이페이지
          </Link>
          <Link
            to={"/"}
            onClick={logoutHandler}
            className="text-subgray no-underline md:h-[80px] md:w-[80px] flex justify-end items-end text-center md:text-right"
          >
            로그아웃
          </Link>
        </div>
      ) : (
        <Link
          to={"/log-in"}
          className="text-subgray no-underline h-[80px] md:w-[160px] flex justify-end items-end text-center md:text-right"
        >
          로그인 / 회원가입
        </Link>
      )}
    </div>
  );
};

export default Header;
