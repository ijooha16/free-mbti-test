import { useMutation, useQuery } from "@tanstack/react-query";
import { updateProfile } from "../api/auth";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { queryClient } from "../api/client";
import Btn from "../components/Btn";
import { toast } from "react-toastify";
import profileIcon from "../assets/iconamoon_profile-fill.png";
import useAuthStore from "../zustand/store/useAuthStore";
import { getUserProfile } from "../api/auth";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { setProfile, setUser } = useAuthStore();

  const { data: user } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 60,
    onSuccess: (userData) => {
      console.log(userData);
      setUser(userData);
    },
    onError: (err) => {
      console.error(err.message);
      alert("유저 정보를 불러오는 데 실패했습니다.");
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      console.log("프로필 업데이트 성공", data);
      queryClient.invalidateQueries(["userProfile"]);
      toast.success("프로필 수정 완료!");
      setEditProfile(false);

      if (data.avatar) {
        setProfile(data.avatar);
        setProfile(data.avatar);
      }
    },
  });

  const submitHandler = (e) => {
    // 기본 제출 이벤트 방지
    e.preventDefault();

    console.log("프로필 수정 폼 제출");

    //폼 데이터
    const formData = new FormData(e.target);
    const avatarInput = formData.get("avatar");
    const nickname = formData.get("nickname");

    const data = new FormData();
    data.append("nickname", nickname);
    if (avatarInput) {
      data.append("avatar", avatarInput);
    }
    //API 요청
    mutation.mutate(data);
  };

  const editBtnHandler = () => {
    setEditProfile(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);

      queryClient.setQueryData(["userProfile"], (oldData) =>
        oldData ? { ...oldData, avatar: imageURL } : { avatar: imageURL }
      );
    }
  };

  return (
    <div>
      {!editProfile ? (
        <div className="flex flex-col items-center">
          <div
            className="mb-[40px] w-[200px] h-[200px] rounded-full bg-no-repeat bg-center bg-lightgray"
            style={{
              backgroundImage: `url(${user?.avatar || profileIcon})`,
              backgroundSize: user?.avatar ? "cover" : "80%",
            }}
          ></div>
          <div className="h-[50px] p-[0_20px font-bold text-[24px]">
            {user?.nickname} 님
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
                backgroundImage: `url(${user?.avatar || profileIcon})`,
                backgroundSize: user?.avatar ? "cover" : "80%",
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
            defaultValue={user?.nickname}
          />

          <Btn type="submit" text="저장" />
        </form>
      )}
    </div>
  );
};

export default Profile;
