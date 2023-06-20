import { Box, Container, Typography } from "@mui/material";
import GetStartedButton from "../components/UI/GetStartedButton";
import useStrings from "../hooks/useStrings";
import LanguageSelect from "../components/UI/LanguageSelect";

const HomePage = () => {
  const strings = useStrings().home;
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
          {strings.title}
        </Typography>
      </Box>
      <Box maxWidth="300px">
        <Typography variant="body1" mb={4} className="animate-slideIn">
          {strings.subtitle}
        </Typography>
      </Box>
      <GetStartedButton />
      <Container sx={{ position: "relative", bottom: "1rem" }}>
        <LanguageSelect />
      </Container>
    </Box>
  );
};

export default HomePage;
