import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GetStartedButton = () => {
  const auth = useSelector((state) => state.authenticator);
  const nav = useNavigate();

  const getStartedClickHandler = () => {
    auth.isLoggedIn ? nav("/connections") : nav("/login");
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        className="animate-pulse"
        onClick={getStartedClickHandler}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default GetStartedButton;
