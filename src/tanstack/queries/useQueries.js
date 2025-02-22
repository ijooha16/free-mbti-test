import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../zustand/store/useAuthStore";
import { getUserProfile } from "../../api/auth";
import { getTestResults } from "../../api/testResults";
import { toast } from "react-toastify";

//프로필 정보 불러오기
export const useUserProfileQuery = () => {
  const { setUser } = useAuthStore();

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 60,
    onSuccess: (userData) => {
      setUser(userData);
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
