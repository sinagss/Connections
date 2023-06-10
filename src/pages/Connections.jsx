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
  IconButton,
  ListSubheader,
} from "@mui/material";
import { Add as AddIcon, Mail, Phone } from "@mui/icons-material";
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
        margin="auto"
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
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  disablePadding
                  disableGutters
                  sx={{
                    cursor: "pointer",
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr 2fr 1fr 1fr",
                      sm: "1fr 1fr 1fr 1fr",
                    },
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                  secondaryAction={
                    <>
                      <IconButton
                        component="a"
                        href={"mailto:" + contact.emails[0]}
                      >
                        <Mail />
                      </IconButton>
                      <IconButton
                        component="a"
                        href={`tel:${contact.phoneNumbers[0]}`}
                      >
                        <Phone />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    sx={{ paddingRight: 14 }}
                    primary={`${contact.firstName} ${contact.lastName}`}
                  />
                  <ListItemText
                    primary="Phone:"
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "flex", alignItems: "flex-end" }}
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        ></Typography>
                        {contact.phoneNumbers[0]}
                      </>
                    }
                  />
                  <ListItemText
                    sx={{ display: { xs: "none", sm: "block" } }}
                    primary="Email:"
                    component="span"
                    secondary={
                      <>
                        <Typography
                          display="inline"
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        ></Typography>
                        {contact.emails[0]}
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
      </Box>
    </>
  );
};

export default Connections;
