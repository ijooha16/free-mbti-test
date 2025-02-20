import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen flex flex-col gap-[80px] justify-center items-center">
      {/* 로그인 여부 확인 후 로그인 안했으면 로그인하기 버튼, 했으면 아래 문구와 버튼 */}
      {/* 닉네임님의 최근 검사 결과예요! / 검사 결과가 없어요, 다시 테스트 할텨? */}

      <Link to={"/test"} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="p-[12px_24px] rounded-full bg-gray-200">
          내 성격 검사하기
        </div>
      </Link>
    </div>
  );
};

export default Home;
