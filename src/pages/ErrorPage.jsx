import { Box, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import ErrorSVG from "../assets/notFound-1.svg";

const ErrorPage = () => {
  const location = useLocation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={4}
      textAlign="center"
    >
      <img src={ErrorSVG} alt="Error Illustration" className="max-w-md" />
      <Typography variant="h1" mb={4}>
        Oops!
      </Typography>
      <Typography variant="h4" mb={4}>
        Something went wrong.
      </Typography>
      <Typography variant="body1" mb={4}>
        We&apos;re sorry, but the page at <strong>{location.pathname}</strong>{" "}
        cannot be found.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go back to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
