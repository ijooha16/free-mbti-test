import { mbtiDescriptions } from "../utils/mbtiCalculator";
import {
  useEditTestResultVisibilityMutation,
  useDeleteTestResultMutation,
} from "../tanstack/mutations/useResultMutations.js";

const ResultCard = ({ data, loggedInUserId }) => {
  const { mutate: editResultVisibility } =
    useEditTestResultVisibilityMutation();
  const { mutate: removeResult } = useDeleteTestResultMutation();
  const { visibility, mbti, userId, nickname, id, createdTime } = data;
  const isOwner = userId === loggedInUserId;
  const textColor = !visibility
    ? "text-[#c0a7da]"
    : isOwner
    ? "text-[#e7d0ff]"
    : "text-black";
  const bgColor = !visibility
    ? "bg-[#48009a8b]"
    : isOwner
    ? "bg-primary"
    : "bg-lightgray";

  const removeHandler = (id) => {
    removeResult(id);
  };

  const editHandler = (id, visibility) => {
    editResultVisibility({ id, visibility });
  };

  return (
    <div className={`p-10 flex flex-col ${bgColor} rounded-[40px]`}>
      <div className="mb-5 flex justify-between items-end">
        <div>
          <div className={`text-2xl font-bold ${textColor}`}>{mbti}</div>
          <div className={`font-bold ${textColor}`}>{nickname} 님</div>
        </div>
        <div className="flex flex-col items-end">
          <div className={`p-2 ${textColor}`}>
            {new Date(createdTime).toLocaleDateString()}
          </div>
          {isOwner && (
            <div>
              <button
                onClick={() => editHandler(id, !visibility)}
                className="text-white p-2 pb-0"
              >
                {visibility ? "숨기기" : "공개하기"}
              </button>
              <button
                onClick={() => removeHandler(id)}
                className="text-white p-2 pb-0"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={textColor}>
        {mbtiDescriptions[mbti] || "설명이 없습니다."}
      </div>
    </div>
  );
};

export default ResultCard;
