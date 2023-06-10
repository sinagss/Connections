import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Fab,
  Toolbar,
  Container,
  Box,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import NewConnection from "../components/NewConnection";
import { useSelector } from "react-redux";

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
      >
        <Container maxWidth={{ xs: "500px", sm: "500px" }} margin="auto">
          <Typography variant="h4" gutterBottom>
            Connections
          </Typography>
          <List>
            {contacts.map((contact, index) => (
              <React.Fragment key={index}>
                <ListItem
                  button
                  alignItems="flex-start"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <ListItemText
                    primary={`${contact.firstName} ${contact.lastName}`}
                  />
                  <ListItemText
                    primary="Phone:"
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {contact.phoneNumbers[0]}
                      </Typography>
                    }
                  />
                  <ListItemText
                    primary="Email:"
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {contact.emails[0]}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < contacts.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
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
