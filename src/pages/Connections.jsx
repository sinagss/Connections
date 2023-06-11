import { useState } from "react";
import { Typography, List, Fab, Toolbar, Container, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import NewConnection from "../components/NewConnection";
import { useSelector } from "react-redux";
import CustomListItem from "../components/UI/CustomListItem";

const Connections = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contacts = useSelector((state) => state.connections.connections);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddContact = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Toolbar />
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "column" }}
        alignItems={{ xs: "center", sm: "center" }}
        justifyContent="center"
        minHeight="100vh"
        p={4}
        textAlign="center"
        overflow="hidden"
        marginX="auto"
        marginBottom="1.5rem"
      >
        <Container margin="auto">
          <Typography variant="h4" gutterBottom>
            Connections
          </Typography>
          <List
            sx={{
              width: "100%",
              maxWidth: "auto",
              bgcolor: "background.paper",
            }}
          >
            {contacts.map((contact, index) => (
              <CustomListItem
                key={index}
                object={contact}
                index={index}
                connectionsLength={contacts.length}
              />
            ))}
          </List>
          <Fab
            color="primary"
            onClick={handleModalOpen}
            sx={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <AddIcon />
          </Fab>
          <NewConnection
            open={isModalOpen}
            onClose={handleModalClose}
            onAddContact={handleAddContact}
          />
        </Container>
      </Box>
    </>
  );
};

export default Connections;
