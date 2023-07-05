import { Box, Typography, Toolbar } from "@mui/material";
import { motion } from "framer-motion";

import AboutImage from "../../public/about.jpg";
import GetStartedButton from "../components/UI/GetStartedButton";
import useStrings from "../hooks/useStrings";

const AboutPage = () => {
  const strings = useStrings().about;

  const animationVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <Toolbar />
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "center", sm: "flex-start" }}
        justifyContent="center"
        minHeight="100vh"
        p={4}
        textAlign="center"
      >
        <Box flex={1}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariant}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h1" mb={4}>
              {strings.title}
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariant}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography variant="body1" mb={4}>
              {strings.paragraph1}
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariant}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography variant="body1" mb={4}>
              {strings.paragraph2}
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariant}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Typography variant="body1" mb={4}>
              {strings.paragraph3}
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariant}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <GetStartedButton />
          </motion.div>
        </Box>
        <Box flex={1}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariant}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <img
              src={AboutImage}
              alt="About Image"
              className="mt-8 min-w-0 max-w-sm rounded-full"
            />
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default AboutPage;
