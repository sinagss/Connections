import { Box, Typography } from "@mui/material";
import GetStartedButton from "../components/UI/GetStartedButton";

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={4}
      textAlign="center"
      className="animate-fadeIn"
    >
      <Box display="flex" flexWrap="wrap">
        <Typography variant="h2" mb={4} className="animate-bounce">
          Contact Information Storage App
        </Typography>
      </Box>
      <Box maxWidth="300px">
        <Typography variant="body1" mb={4} className="animate-slideIn">
          Welcome to our modern contact information storage app! Manage all your
          contacts easily with advanced features.
        </Typography>
      </Box>
      <GetStartedButton />
    </Box>
  );
};

export default HomePage;
