import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { IRootReducer } from "../store";
import "../styles/home.scss";

const Home = () => {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: IRootReducer) => state.auth);

  const handleRedirect = (url: string) => {
    navigate(url);
  };
  return (
    <div>
      <h1 className="">Home</h1>
      {isLogin ? "Is Login" : "Is Not Login"}
      {isLogin ? (
        <header>
          <Button onClick={() => handleRedirect("/chat")}>Chat</Button>
        </header>
      ) : (
        <header>
          <Button onClick={() => handleRedirect("/login")}>Login</Button>
        </header>
      )}
    </div>
  );
};

export default Home;
