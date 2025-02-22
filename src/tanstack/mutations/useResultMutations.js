import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../client.js";
import { toast } from "react-toastify";
import {
  createTestResult,
  deleteTestResult,
  updateTestResultVisibility,
} from "../../api/testResults.js";

//테스트 결과 저장
export const useCreateTestResultMutation = () => {
  return useMutation({
    mutationFn: createTestResult,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["results"]);
      toast.success("테스트 결과 저장 성공!");
      console.log("테스트 결과 저장 성공:", data);
    },
    onError: (error) => {
      toast.error("테스트 결과 저장 실패!");
      console.error("테스트 결과 저장 실패:", error);
    },
  });
};

//결과 삭제
export const useDeleteTestResultMutation = () => {
  return useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["results"]);
      toast.success("내 결과 카드가 삭제되었어요!");
      console.log("데이터 삭제 성공");
    },
    onError: (error) => {
      toast.error("데이터 삭제에 실패했어요");
      console.log("데이터 삭제 실패", error);
    },
  });
};

//공개 설정 변경
export const useEditTestResultVisibilityMutation = () => {
  return useMutation({
    mutationFn: ({ id, visibility }) =>
      updateTestResultVisibility(id, visibility),
    onSuccess: () => {
      queryClient.invalidateQueries(["results"]);
      toast.success("공개 설정 변경이 완료되었어요!");
      console.log("공개 모드 변경 성공");
    },
    onError: (error) => {
      toast.error("공개 설정 변경에 실패했어요");
      console.log("공개 모드 변경 실패", error);
    },
  });
};
