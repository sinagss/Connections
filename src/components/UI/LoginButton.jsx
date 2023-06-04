import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const isLoggedIn = useSelector((state) => state.authenticator.isLoggedIn);
  const nav = useNavigate();

  const clickHandler = () => {
    console.log(`islogged in: ${isLoggedIn}`);
    if (isLoggedIn === true) {
      nav("/");
    } else {
      nav("login");
    }
  };

  return (
    <Button variant="contained" onClick={clickHandler}>
      Login
    </Button>
  );
};

export default LoginButton;
