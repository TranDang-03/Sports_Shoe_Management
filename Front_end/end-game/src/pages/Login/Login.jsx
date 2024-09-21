import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/LoginForm/SignUpForm";

const Login = () => {
  const boxStyle = {
    height: "100vh",
    backgroundImage: 'url("BannerLogin.jpg")',
    backgroundSize: "cover",
  };

  return (
    <div style={boxStyle}>
      <LoginForm />
      <SignUpForm />
    </div>
  );
};
export default Login;
