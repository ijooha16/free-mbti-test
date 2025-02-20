import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      Login
      <Link to={"/sign-up"} style={{ textDecoration: "none", color: "inherit" }}>
        <div>회원가입</div>
      </Link>
    </div>
  );
};

export default Login;
