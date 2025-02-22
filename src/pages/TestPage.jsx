import { useState } from "react";
import { toast } from "react-toastify";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import useAuthStore from "../zustand/store/useAuthStore";
import { useCreateTestResultMutation } from "../tanstack/mutations/useResultMutations";
import Btn from "../components/Btn";
import Title from "../components/layout/Title";
import SareBtn from "../components/ShareBtn";

const TestPage = () => {
  const [result, setResult] = useState(null);
  const { userId } = useAuthStore();
  const { mutate: createTestResult } = useCreateTestResultMutation();

  const handleTestSubmit = (answers) => {
    if (answers.some((answer) => answer.type.trim() === "")) {
      toast.error("모든 문항에 답해주세요.");
      return;
    }

    const mbtiResult = calculateMBTI(answers);
    setResult(mbtiResult);
    createTestResult({
      userId,
      mbti: mbtiResult,
      visibility: true,
      createdTime: new Date(),
    });
  };

  const testAgainHandler = () => {
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <Title title="MBTI 테스트" />
      <div className="w-[400px] flex flex-col items-center gap-[30px] bg-white rounded-lg overflow-y-auto">
        {!result ? (
          <TestForm onSubmit={handleTestSubmit} />
        ) : (
          <>
            <h1 className="text-[62px] font-bold text-primary mb-6">
              {result}
            </h1>
            <p className="text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <Btn
              text="테스트 다시하기"
              type="button"
              onClick={testAgainHandler}
            />
            <div className="flex gap-6">
              <SareBtn />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
