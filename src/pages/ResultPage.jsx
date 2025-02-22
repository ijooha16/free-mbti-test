import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../zustand/store/useAuthStore";
import { getTestResults } from "../api/testResults";
import ResultCard from "../components/ResultCard.jsx";

const ResultPage = () => {
  const { userId } = useAuthStore();

  const { data: results } = useQuery({
    queryKey: ["results"],
    queryFn: getTestResults,
  });

  return (
    <div className="w-[400px] md:w-[600px] flex flex-col justify-center items-center gap-[40px]">
      {results?.length > 0 ? (
        results
          .slice()
          .reverse()
          .map((data) => {
            //비공개인데 내 결과가 아닐 때
            if (!data.visibility && data.userId !== userId) return null;

            return <ResultCard key={data.id} data={data} userId={userId} />;
          })
      ) : (
        <p>결과가 없습니다.</p>
      )}
    </div>
  );
};

export default ResultPage;
