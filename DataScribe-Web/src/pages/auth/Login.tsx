import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Label } from "reactstrap";
import { images } from "../../assets/images";
import { onLogIn } from "../../store/AuthReducer";
import "../../styles/login.scss";

const Login = () => {
  const registerPath = "/register";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleRedirect = (url: string) => {
    navigate(url);
  };

  const handleLogin = () => {
    dispatch(onLogIn());
    handleRedirect("/chat");
  };

  return (
    <div className="login-section">
      <div className="login-main p-40 d-flex flex-column w-100">
        <div className="d-flex align-items-center">
          <img src={images.logo} width={60} />
          <h1 className="ml-10 mb-0 c-black">
            <span className="fw-bold">Data</span>Scribe
          </h1>
        </div>
        <div className="h-100 w-100 p-40 d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column align-items-center">
            <h1 className="c-black">{location.pathname === registerPath ? "Register" : "Login"}</h1>
            <p className="c-secondary">{location.pathname === registerPath ? "Register" : "Login"} to DataScribe</p>
            <div className="w-100">
              <Label className="c-black">Email</Label>
              <Input className="p-10" placeholder="Email" />
            </div>
            <div className="mt-20 w-100">
              <Label className="c-black">Password</Label>
              <Input className="p-10" placeholder="Password" />
            </div>
            <Button className="mt-20 w-100 btn-primary" onClick={handleLogin}>
              {location.pathname === registerPath ? "Register" : "Login"}
            </Button>
            {location.pathname === registerPath ? (
              <p className="c-secondary mt-20">
                You do have an account yet?{" "}
                <span className="fw-bold c-primary cursor-pointer" onClick={() => handleRedirect("/login")}>
                  Sing in
                </span>
              </p>
            ) : (
              <p className="c-secondary mt-20">
                You don't have an account yet?{" "}
                <span className="fw-bold c-primary cursor-pointer" onClick={() => handleRedirect("/register")}>
                  Sing up
                </span>
              </p>
            )}
            <p className="c-secondary">
              By {location.pathname === registerPath ? "signing in" : "signing up"} , you agree to our <span className="c-primary cursor-pointer">Terms & Conditions</span> and our
              <span className="c-primary cursor-pointer"> Privacy policy.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 login-bg"></div>
    </div>
  );
};

export default Login;
