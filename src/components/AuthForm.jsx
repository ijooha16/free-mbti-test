const AuthForm = ({ type, name, placeHolder }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeHolder}
        className="h-[50px] w-[200px] p-[0_20px] rounded-full bg-gray-200"
      ></input>
    </div>
  );
};

export default AuthForm;
