import useAuthStore from "../zustand/store/useAuthStore";
import ResultCard from "../components/ResultCard.jsx";
import Title from "../components/layout/Title.jsx";
import { useTestResultsQuery } from "../tanstack/queries/useQueries.js";

const ResultPage = () => {
  const { userId } = useAuthStore();
  const { data: results } = useTestResultsQuery();

  return (
    <div className="w-[400px] md:w-[600px] flex flex-col justify-center items-center gap-[40px]">
      <Title title="결과" />
      {Array.isArray(results) && results.length > 0 ? (
        results
          .slice()
          .reverse()
          .map((data) => {
            const hiddenResults = !data.visibility && data.userId !== userId;

            //비공개인데 내 결과가 아닐 때
            if (hiddenResults) return null;

            return (
              <ResultCard key={data.id} data={data} loggedInUserId={userId} />
            );
          })
      ) : (
        <p>결과가 없습니다.</p>
      )}
    </div>
  );
};

export default ResultPage;
