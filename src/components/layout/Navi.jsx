import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../zustand/store/useAuthStore";

const Navi = () => {
  const { token } = useAuthStore();
  const isLogin = !!token;
  const location = useLocation();
  const isTestPage = location.pathname === "/test";
  const isResultPage = location.pathname === "/results";

  return isLogin ? (
    <div className="fixed top-[260px] left-[60px] flex flex-col gap-[20px]">
      <Link
        to="/test"
        className={`w-[80px] h-[40px] p-[0_12px] text-inherit no-underline ${
          isTestPage
            ? "text-subgray font-normal opacity-50"
            : "text-black font-bold"
        }`}
      >
        <TestBtn />
      </Link>

      <Link
        to="/results"
        className={`w-[80px] h-[40px] p-[0_12px] text-inherit no-underline ${
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
