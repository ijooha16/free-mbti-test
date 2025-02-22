import { Link } from "react-router-dom";
import Btn from "../components/Btn.jsx";
import useAuthStore from "../zustand/store/useAuthStore.js";
import { useQuery } from "@tanstack/react-query";
import { getTestResults } from "../api/testResults.js";
import { mbtiDescriptions } from "../utils/mbtiCalculator";

const Home = () => {
  const { token, userId } = useAuthStore();
  const isLogin = !!token;

  const { data: result } = useQuery({
    queryKey: ["myResult"],
    queryFn: getTestResults,
  });

  const myRecentResult =
    result
      ?.slice()
      .reverse()
      .find((result) => result.userId === userId) || null;

  return (
    <div className="w-screen flex flex-col gap-[80px] justify-center items-center">
      {isLogin ? (
        <>
          {myRecentResult ? (
            <div className="w-[400px] flex flex-col items-center gap-[30px] text-center">
              <div className="text-subgray">
                {userId}님의 최근 검사 결과예요!
              </div>
              {/* 결과 카드 */}
              <div className="font-bold text-[62px] text-primary">
                {myRecentResult.mbti}
              </div>
              <div>{mbtiDescriptions[myRecentResult.mbti]}</div>
            </div>
          ) : (
            <>최근 검사 결과가 없어요! 검사 하러 가실라우?</>
          )}
          {/* 닉네임님의 최근 검사 결과예요! / 검사 결과가 없어요, 다시 테스트 할텨? */}

          <Link to={"/test"}>
            <Btn type="button" text="내 성격 유형 알아보기" />
          </Link>
        </>
      ) : (
        <>
          <div className="mt-[200px] mb-[120px]">로그인 하셔야 이용하실 수 있어요!</div>
          <Link to={"/log-in"}>
            <Btn type="button" text="로그인 하러 가기" />
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
