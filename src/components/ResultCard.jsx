import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { useMutation } from "@tanstack/react-query";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";
import { queryClient } from "../api/client.js";
import { toast } from "react-toastify";

const ResultCard = ({ data, userId }) => {
  const { visibility, mbti, userId: userid, id, createdTime } = data;

  const removeMutation = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      toast.success('내 결과 카드가 삭제되었어요!')
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
    onSuccess: () => {
      toast.success('공개 설정 변경이 완료되었어요!')
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
    <div
      className={`p-[40px_40px] flex flex-col ${
        !visibility
          ? "bg-[#48009a8b]"
          : userid === userId
          ? "bg-primary"
          : "bg-lightgray"
      } rounded-[40px]`}
    >
      <div className="mb-[20px] flex justify-between items-end">
        <div>
          <div
            className={`text-[32px] font-bold ${
              !visibility
                ? "text-[#c0a7da]"
                : userid === userId
                ? "text-white"
                : "text-primary"
            }`}
          >
            {mbti}
          </div>
          <div
            className={`font-bold ${
              !visibility
                ? "text-[#c0a7da]"
                : userid === userId
                ? "text-[#e7d0ff]"
                : "text-black"
            }`}
          >
            {userid} 님
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div
            className={` p-[8px] ${
              !visibility
                ? "text-[#c0a7da]"
                : userid === userId
                ? "text-[#e7d0ff]"
                : "text-black"
            }`}
          >
            {new Date(createdTime).toLocaleDateString()}
          </div>
          {userid === userId && (
            <div>
              <button
                onClick={() => editHandler(id, !visibility)}
                className="text-white p-[8px] pb-0"
              >
                {visibility ? "숨기기" : "공개하기"}
              </button>
              <button
                onClick={() => removeHandler(id)}
                className="text-white p-[8px] pb-0"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${
          !visibility
            ? "text-[#c0a7da]"
            : userid === userId
            ? "text-[#e7d0ff]"
            : "text-black"
        }`}
      >
        {mbtiDescriptions[mbti] || "설명이 없습니다."}
      </div>
    </div>
  );
};

export default ResultCard;
