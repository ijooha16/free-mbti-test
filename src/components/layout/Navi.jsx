import { Link } from "react-router-dom";

const Navi = () => {
  return (
    <div className="fixed top-[260px] left-[60px] flex flex-col gap-[20px]">
      <Link to={"/test"} style={{ textDecoration: "none", color: "inherit" }}>
        <TestBtn />
      </Link>
      <Link to={"/result"} style={{ textDecoration: "none", color: "inherit" }}>
        <ResultBtn />
      </Link>
    </div>
  );
};

export default Navi;

const TestBtn = () => {
  return (
    <div className="h-[60px] w-[60px] flex justify-center items-center rounded-full bg-gray-200">
      Test
    </div>
  );
};

const ResultBtn = () => {
  return (
    <div className="h-[60px] w-[60px] flex justify-center items-center rounded-full bg-gray-200">
      Result
    </div>
  );
};
