import { Link } from "react-router-dom";
import Btn from "../components/Btn.jsx";
import useAuthStore from "../zustand/store/useAuthStore.js";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { useTestResultsQuery } from "../tanstack/queries/useQueries.js";

const Home = () => {
  const { token, userId } = useAuthStore();
  const isLogin = !!token;
  const { data: result } = useTestResultsQuery();

  //내 최근 결과
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
                <div className="text-subgray mt-[6px]">
                  아래 버튼을 눌러 다시 검사해보실 수 있어요!
                </div>
              </div>
              {/* 결과 카드 */}
              <div className="font-bold text-[62px] text-primary">
                {myRecentResult.mbti}
              </div>
              <div>{mbtiDescriptions[myRecentResult.mbti]}</div>
            </div>
          ) : (
            <>최근 검사 결과가 없어요! 검사 하러 가시겠어요?</>
          )}

          <Link to={"/test"}>
            <Btn type="button" text="내 성격 유형 알아보기" />
          </Link>
        </>
      ) : (
        <>
          <div className="mt-[120px] md:mt-[60px] text-[32px] font-bold">
            무료 성격 검사 페이지입니다!
          </div>
          <div className="text-subgray text-center text-[20px] leading-loose">
            <b className="text-primary">테스트</b> 로 자신의 성격 유형을
            파악하고
            <br /> <b className="text-primary">결과페이지</b> 에서 다른 사람들의
            유형도 살펴보세요!
          </div>
          <Link to={"/log-in"}>
            <Btn type="button" text="테스트 하러 가기" />
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
