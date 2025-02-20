import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="p-[0_60px] w-screen h-[200px] fixed top-[0] flex justify-between items-center">
      <div className="w-[120px]"></div>
      <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="h-[80px] text-[52px] font-bold">MBTI TEST</div>
      </Link>
      <Link to={"/log-in"} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="h-[80px] w-[120px] flex justify-end items-end text-right">
          로그인 / 회원가입
        </div>
      </Link>
    </div>
  );
};

export default Header;
