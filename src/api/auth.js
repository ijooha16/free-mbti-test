import api from "./api";

export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};
//body
// {
//     "id": "유저 아이디",
// 		"password": "유저 비밀번호",
// 		"nickname": "유저 닉네임"
// }
//response
//{
//     "message": "회원가입 완료",
//     "success": true
//   }

export const login = async (userData) => {
  const response = await api.post("/login", userData);
  return response.data;
};
//body
// {
//     "id":"유저 아이디",
//     "password": "유저 비밀번호"
// }
// /login?expiresIn=10m
// 유효시간을 10분인 accessToken 요청
//response
// {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiY2FiYyIsImlhdCI6MTcwMDgxNDQyMCwiZXhwIjoxNzAwODE4MDIwfQ.8hWOHHEzDPzumnqCU7jyoi3zFhr-HNZvC7_pzBfOeuU",
//     "userId": "유저 아이디",
//     "success": true,
//     "avatar": "프로필 이미지",
//     "nickname": "유저 닉네임"
// }

export const getUserProfile = async () => {
  const response = await api.get("/user");

  return response.data;
};
// header
// {
// 	"Authorization": "Bearer AccessToken"
// }
//다른 유저의 회원 정보 요청
// /user?user_id=abc@gmail.com
//정보가 없는 경우 response
// {
// 	"message": "요청한 user_id에 해당하는 유저가 없습니다."
// }
// response
// {
//     "id": "사용자 아이디",
//     "nickname": "사용자 닉네임",
//     "avatar": null,
//     "success": true
// }

export const updateProfile = async (formData) => {
  const token = "accessToken";

  const response = await api.patch("/profile", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(token)}`,
    },
  });

  return response.data;
};
//header (thunder client는 content-type 없어야함)
// {
// 	"Content-Type": "multipart/form-data",
// 	"Authorization": "Bearer AccessToken"
// }
//body
// {
// 	"avatar": [이미지파일],
// 	"nickname": "변경할 닉네임"
// }
//response
// {
//     "avatar": "변경된 이미지 URL",
//     "nickname": "변경된 닉네임",
//     "message": "프로필이 업데이트되었습니다.",
//     "success": true
// }
