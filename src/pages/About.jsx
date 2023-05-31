import { Box, Typography, Toolbar } from "@mui/material";
import { motion } from "framer-motion";

import AboutImage from "../assets/about.jpg";
import GetStartedButton from "../components/UI/GetStartedButton";

const AboutPage = () => {
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
              About Our App
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariant}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography variant="body1" mb={4}>
              Our contact information storage app is designed to help you
              efficiently manage and organize your contacts. With a modern and
              intuitive interface, you can easily store and retrieve contact
              details such as names, phone numbers, email addresses, and more.
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariant}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography variant="body1" mb={4}>
              Stay connected with your network and never lose important contact
              information again. Our app provides a seamless experience,
              allowing you to categorize contacts, search and filter through
              your list, and keep your data up-to-date.
            </Typography>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariant}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Typography variant="body1" mb={4}>
              Whether you&apos;re an individual or a business, our app is
              tailored to meet your contact management needs. Simplify your life
              and enhance your productivity by organizing your contacts
              efficiently with our powerful yet user-friendly application.
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
              className="mt-8 max-w-xl rounded-full"
            />
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default AboutPage;
