import { useEffect, useState } from "react";
import {
  Typography,
  List,
  Fab,
  Toolbar,
  Container,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import NewConnection from "../components/NewConnection";
import { useSelector } from "react-redux";
import CustomListItem from "../components/UI/CustomListItem";

function sortByType(type, connections) {
  let sortedConnections = [...connections];

  switch (type) {
    case "fav":
      sortedConnections.sort((a, b) => sortByFav(a, b));
      break;
    case "az":
      sortedConnections.sort((a, b) => sortByFirstName(a, b));
      break;
    case "za":
      sortedConnections.sort((a, b) => sortByFirstNameReverse(a, b));
      break;
    default:
      sortedConnections.sort((a, b) => sortByFav(a, b));
      break;
  }

  return sortedConnections;
}

function sortByFirstName(a, b) {
  const nameA = a.firstName.toLowerCase();
  const nameB = b.firstName.toLowerCase();

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}
function sortByFirstNameReverse(a, b) {
  const nameA = a.firstName.toLowerCase();
  const nameB = b.firstName.toLowerCase();

  if (nameA > nameB) return -1;
  if (nameA < nameB) return 1;
  return 0;
}

function sortByFav(a, b) {
  if (a.favorite && !b.favorite) {
    return -1;
  }
  if (!a.favorite && b.favorite) {
    return 1;
  }
  return sortByFirstName(a, b);
}

const Connections = () => {
  const contacts = useSelector((state) => state.connections.connections);

  const [connections, setConnections] = useState(
    [...contacts].sort((a, b) => sortByFav(a, b))
  );
  const [sortType, setSortType] = useState("fav");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSortType("fav");
  }, []);

  useEffect(() => {
    // TODO:
  }, [connections]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddContact = () => {
    setIsModalOpen(false);
  };

  const sortChangeHandler = (event) => {
    const type = event.target.value;
    setSortType(type);

    const sortedConnections = sortByType(type, [...connections]);

    setConnections(sortedConnections);
  };

  const toggleFavorite = (object) => {
    const updatedConnections = connections.map((connection) =>
      connection.id === object.id
        ? { ...connection, favorite: !connection.favorite }
        : connection
    );
    setConnections(updatedConnections);
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
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ flexShrink: "initial" }}
            >
              Connections
            </Typography>
            <FormControl sx={{ minWidth: 110 }} size="small">
              <InputLabel>Sort</InputLabel>
              <Select
                value={sortType}
                label="Sort"
                sx={{ minWidth: "fit-content" }}
                onChange={(e) => sortChangeHandler(e)}
              >
                <MenuItem value={"fav"}>⭐ First</MenuItem>
                <MenuItem value={"az"}>A{"→"}Z</MenuItem>
                <MenuItem value={"za"}>Z{"→"}A</MenuItem>
              </Select>
            </FormControl>
          </Container>
          <List
            sx={{
              width: "100%",
              maxWidth: "auto",
              bgcolor: "background.paper",
            }}
          >
            {connections.map((contact, index) => (
              <CustomListItem
                key={contact.id}
                object={contact}
                index={index}
                connectionsLength={connections.length}
                toggleFavorite={toggleFavorite}
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
