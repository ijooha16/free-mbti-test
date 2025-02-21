import { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";

const TestPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const { userId } = useAuthStore();

  console.log(result);
  const mutation = useMutation({
    mutationFn: createTestResult,
    onSuccess: (data) => {
      console.log("테스트 결과 저장 성공:", data);
    },
    onError: (error) => {
      console.error("테스트 결과 저장 실패:", error);
    },
  });

  const handleTestSubmit = (answers) => {
    const mbtiResult = calculateMBTI(answers);
    setResult(mbtiResult);
    mutation.mutate({
      userId,
      mbti: mbtiResult,
      visibility: true,
      createdTime: new Date(),
    });
  };

  const testAgainHandler = () => {
    setResult(null)
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {!result ? (
          <TestForm onSubmit={handleTestSubmit} />
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-200 mb-6">
              테스트 결과: {result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <button
              onClick={testAgainHandler}
              className="w-full bg-gray-200 text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]"
            >
              테스트 다시하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
