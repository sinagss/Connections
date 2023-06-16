import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useStrings from "../../hooks/useStrings";

const GetStartedButton = () => {
  const auth = useSelector((state) => state.authenticator);
  const nav = useNavigate();

  const strings = useStrings().common;

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
        {strings.getStartedButton}
      </Button>
    </Box>
  );
};

export default GetStartedButton;
