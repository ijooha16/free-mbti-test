import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../api/auth";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { queryClient } from "../api/client";
import Btn from "../components/Btn";
import { toast } from "react-toastify";
import profileIcon from "../assets/iconamoon_profile-fill.png";
import useAuthStore from "../zustand/store/useAuthStore";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { avatar, nickname, setUser } = useAuthStore();

  // const { data } = useQuery({
  //   queryKey: ["userProfile"],
  //   queryFn: getUserProfile,
  //   staleTime: 1000 * 60 * 10,
  //   onSuccess: (data) => {
  //     setUser(data)
  //   }
  // });

  const mutation = useMutation({
    mutationFn: ({ avatar, nickname }) => updateProfile({ avatar, nickname }),
    onSuccess: (data) => {
      console.log("프로필 업데이트 성공", data);
      queryClient.setQueryData(["userProfile"], (oldData) => ({
        ...oldData,
        avatar: data.avatar, // ✅ 서버에서 받은 이미지 URL로 업데이트
        nickname: data.nickname,
      }));
  
      queryClient.invalidateQueries(["userProfile"]);
      // queryClient.refetchQueries(["userProfile"]);
      toast.success("프로필 수정 완료!");
      setEditProfile(false);
      setUser(data)
    },
  });

  const submitHandler = (e) => {
    // 기본 제출 이벤트 방지
    e.preventDefault();

    console.log("프로필 수정 폼 제출");

    //폼 데이터
    const formData = new FormData(e.target);
    const avatarInput = formData.get("avatar");
    const avatarFile = avatarInput && avatarInput.files ? avatarInput.files[0] : null;
    const nickname = formData.get("nickname");
    
    const data = new FormData();
    data.append("nickname", nickname);
    if (avatarFile) {
      data.append("avatar", avatarFile);
    }
  
    // ✅ API 요청 실행
    mutation.mutate(data);
    setEditProfile(false);
  };

  const editBtnHandler = () => {
    setEditProfile(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);

      queryClient.setQueryData(["userProfile"], (oldData) => ({
        ...oldData,
        avatar: imageURL, // 미리보기 즉시 반영
      }));
    }
  };

  return (
    <div>
      {!editProfile ? (
        <div className="flex flex-col items-center">
          <div
            className="mb-[40px] w-[200px] h-[200px] rounded-full bg-no-repeat bg-center bg-lightgray"
            style={{
              backgroundImage: `url(${avatar || profileIcon})`,
              backgroundSize: avatar ? "cover" : "80%",
            }}
          ></div>
          <div className="h-[50px] p-[0_20px font-bold text-[24px]">
            {nickname} 님
          </div>
          <Btn type="button" text="프로필 수정하기" onClick={editBtnHandler} />
        </div>
      ) : (
        <form
          onSubmit={(e) => submitHandler(e)}
          className="flex flex-col justify-center items-center"
        >
          <div className="mb-[40px] flex flex-col items-center">
            <label
              htmlFor="avatarUpload"
              className="cursor-pointer w-[200px] h-[200px] rounded-full bg-no-repeat bg-center bg-lightgray flex items-center justify-center"
              style={{
                backgroundImage: `url(${avatar || profileIcon})`,
                backgroundSize: avatar ? "cover" : "80%",
              }}
            ></label>
            <input
              id="avatarUpload"
              type="file"
              name="avatar"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <AuthForm
            type="text"
            name="nickname"
            placeHolder="닉네임"
            defaultValue={nickname}
          />

          <Btn type="submit" text="저장" />
        </form>
      )}
    </div>
  );
};

export default Profile;
