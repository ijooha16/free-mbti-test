import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../api/auth";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { queryClient } from "../api/client";
import SubmitBtn from "../components/SubmitBtn";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      console.log("프로필 업데이트 성공", data);
      queryClient.invalidateQueries(["userProfile"]);
      setEditProfile(false);
    },
  });

  const submitHandler = (e) => {
    // 기본 제출 이벤트 방지
    e.preventDefault();

    console.log("프로필 수정 폼 제출");
    alert("프로필 수정 완료");

    //폼 데이터
    const formData = new FormData(e.target);
    const avatarInput = formData.get("avatar");
    const avatar = avatarInput.files ? avatarInput.files[0] : null;
    const nickname = formData.get("nickname");

    //mutate
    mutation.mutate({ avatar, nickname });
  };

  const editBtnHandler = () => {
    setEditProfile(true);
    console.log("프로필 수정하기 버튼 클릭");
  };

  return (
    <div>
      {!editProfile ? (
        <div>
          <div>아이디: {user?.id}</div>
          <div>닉네임: {user?.nickname}</div>
          <div>{user?.avatar}</div>
          <SubmitBtn
            type="button"
            text="프로필 수정하기"
            onClick={editBtnHandler}
          />
        </div>
      ) : (
        <form
          onSubmit={(e) => submitHandler(e)}
          className="flex flex-col justify-center items-center gap-[20px]"
        >
          <AuthForm
            type="text"
            name="nickname"
            placeHolder="닉네임"
            defaultValue={user?.nickname}
          />
          <input type="file" name="avatar" />
          <SubmitBtn type="submit" text="저장" />
        </form>
      )}
    </div>
  );
};

export default Profile;
