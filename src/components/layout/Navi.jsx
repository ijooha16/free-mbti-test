import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../zustand/store/useAuthStore";

const Navi = () => {
  const { token } = useAuthStore();
  const isLogin = !!token;
  const location = useLocation();
  const isTestPage = location.pathname === "/test";
  const isResultPage = location.pathname === "/results";

  return isLogin ? (
    <div className="fixed flex-col top-[140px] left-[40px] w-[80px] gap-[10px] justify-center 
    md:top-[260px] md:left-[60px] md:translate-x-0 md:w-auto md:gap-[20px]">
      <Link
        to="/test"
        className={`w-[80px] h-[20px] p-[0_12px] text-inherit no-underline ${
          isTestPage
            ? "text-subgray font-normal opacity-50"
            : "text-black font-bold"
        }`}
      >
        <TestBtn />
      </Link>

      <Link
        to="/results"
        className={`w-[80px] h-[20px] p-[0_12px] text-inherit no-underline ${
          isResultPage
            ? "text-subgray font-normal opacity-50"
            : "text-black font-bold"
        }`}
      >
        <ResultBtn />
      </Link>
    </div>
  ) : (
    <></>
  );
};

export default Navi;

const TestBtn = () => {
  return (
    <div
      className="h-[40px] w-[60px] font-bold text-[20px] rounded-full 
    hover:scale-125 hover:text-primary transition-transform duration-300 ease-in-out"
    >
      Test
    </div>
  );
};

const ResultBtn = () => {
  return (
    <div
      className="h-[40px] w-[60px] font-bold text-[20px] rounded-full 
    hover:scale-125 hover:text-primary transition-transform duration-300 ease-in-out"
    >
      Result
    </div>
  );
};
