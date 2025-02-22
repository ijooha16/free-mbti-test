import { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import useAuthStore from "../zustand/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import Btn from "../components/Btn";
import linkIcon from "../assets/line-md_link.png";

const TestPage = () => {
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
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
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

const SareBtn = () => {
  // Share must be triggered by "user activation"
  const shareHandler = async () => {
    try {
      await navigator.share(shareData);
      console.log("공유 성공");
    } catch (err) {
      console.log(err);
    }
  };

  const shareData = {
    title: "MBTI TEST",
    text: "내 성격 유형을 알아보자!",
    url: "https://free-mbti-test-aw11n78r9-juha-yoons-projects.vercel.app",
  };

  return (
    <button
      type="button"
      onClick={shareHandler}
      className="bg-lightgray rounded-full w-[40px] h-[40px] flex justify-center items-center"
    >
      <img src={linkIcon} alt="share" className="w-4/5 h-4/5 object-contain" />
    </button>
  );
};
