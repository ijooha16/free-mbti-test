import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../api/auth";
import { getTestResults } from "../../api/testResults";
import { toast } from "react-toastify";

//프로필 정보 불러오기
export const useUserProfileQuery = () => {

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 60,
    onSuccess: (userData) => {
      console.log(userData);
    },
    onError: (err) => {
      toast.error("프로필 정보를 불러오지 못했어요");
      console.error(err.message);
    },
  });
};

//테스트 결과 불러오기
export const useTestResultsQuery = () => {
  return useQuery({
    queryKey: ["results"],
    queryFn: getTestResults,
  });
};
