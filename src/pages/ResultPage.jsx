import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthStore from "../zustand/store/useAuthStore";
import {
  deleteTestResult,
  getTestResults,
  updateTestResultVisibility,
} from "../api/testResults";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { queryClient } from "../api/client.js";

const ResultPage = () => {
  const { userId } = useAuthStore();

  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["results"],
    queryFn: getTestResults,
  });

  const removeMutation = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: (data) => {
      alert("삭제 성공");
      console.log(data);
      // queryClient.refetchQueries(["results"]);
      queryClient.invalidateQueries(["results"]);
    },
    onError: (error) => {
      console.log("데이터 삭제 실패", error);
    },
  });

  const removeHandler = (id) => {
    removeMutation.mutate(id);
  };

  const editMutation = useMutation({
    mutationFn: ({ id, visibility }) =>
      updateTestResultVisibility(id, visibility),
    onSuccess: (data) => {
      alert("공개 설정이 변경되었어요");
      console.log(data);
      // queryClient.refetchQueries(['results'])
      queryClient.invalidateQueries(["results"]);
    },
    onError: (error) => {
      console.log("공개 모드 변경 실패", error);
    },
  });

  const editHandler = (id, visibility) => {
    editMutation.mutate({ id, visibility });
  };

  return (
    <div className="w-[600px]">
      {results?.length > 0 ? (
        results.map((data) => {
          //비공개인데 내 결과가 아닐 때
          if (!data.visibility && data.userId !== userId) return null;

          return (
            <div key={data.id}>
              <div>{data.mbti}</div>
              <div>{data.userId}</div>
              <div>{new Date(data.createdTime).toLocaleDateString()}</div>{" "}
              <div>{mbtiDescriptions[data.mbti] || "설명이 없습니다."}</div>
              {data.userId === userId && (
                <div>
                  <button onClick={() => editHandler(data.id, !data.visibility)}>
                    {data.visibility ? "숨기기" : "공개하기"}
                  </button>
                  <button onClick={() => removeHandler(data.id)}>삭제</button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>결과가 없습니다.</p>
      )}
    </div>
  );
};

export default ResultPage;
