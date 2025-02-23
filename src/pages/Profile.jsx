import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { queryClient } from "../tanstack/client";
import Btn from "../components/Btn";
import profileIcon from "../assets/iconamoon_profile-fill.png";
import Title from "../components/layout/Title";
import { useUpdateProfileMutation } from "../tanstack/mutations/useAuthMutations";
import { useUserProfileQuery } from "../tanstack/queries/useQueries";

const Profile = () => {
  const { mutate: updateProfile } = useUpdateProfileMutation();
  const [editProfile, setEditProfile] = useState(false);
  const { data: user } = useUserProfileQuery();

  //프로필 수정 제출
  const submitHandler = (e) => {
    e.preventDefault();

    //폼 데이터
    const formData = new FormData(e.target);
    const avatarInput = formData.get("avatar");
    const nickname = formData.get("nickname");

    const data = new FormData();
    data.append("nickname", nickname);
    if (avatarInput) {
      data.append("avatar", avatarInput);
    }
    //프로필 수정 요청
    updateProfile(data, { onSuccess: setEditProfile(false) });
  };

  const editBtnHandler = () => {
    setEditProfile(true);
  };

  //미리보기 이미지 변경
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
    <div className="flex flex-col items-center gap-[40px]">
      <Title title="프로필" />
      {!editProfile ? (
        <div className="flex flex-col items-center">
          <div className="mb-[40px] w-[200px] h-[200px] rounded-full bg-lightgray flex items-center justify-center overflow-hidden">
            <img
              src={user?.avatar || profileIcon}
              alt="프로필 이미지"
              className={`w-full h-full object-cover ${
                user?.avatar ? "object-cover" : "p-[20%]"
              }`}
            />
          </div>
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
              className="cursor-pointer w-[200px] h-[200px] rounded-full bg-lightgray flex items-center justify-center overflow-hidden"
            >
              <img
                src={user?.avatar || profileIcon}
                alt="프로필 이미지"
                className={`w-full h-full ${
                  user?.avatar ? "object-cover" : "p-[20%]"
                }`}
              />
            </label>
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
