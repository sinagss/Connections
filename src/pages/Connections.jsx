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
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import contacts from "../data/connections.json";
import NewConnection from "../components/NewConnection";

const Connections = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddContact = (newContact) => {
    // Logic to add the new contact to the list

    console.log("New contact:", newContact);

    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <>
      <Toolbar />
      <Container className="mx-0 my-auto max-w-xl">
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
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Phone: {contact.phoneNumbers[0].number}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Email: {contact.emails[0].email}
                      </Typography>
                    </>
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
    </>
  );
};

export default Connections;
