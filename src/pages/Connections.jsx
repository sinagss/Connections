import { useEffect, useState } from "react";
import {
  Typography,
  List,
  Fab,
  Toolbar,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import NewConnection from "../components/NewConnection";
import { useSelector } from "react-redux";
import CustomListItem from "../components/UI/CustomListItem";
import useStrings from "../hooks/useStrings";
import SnackAlert from "../components/UI/SnackAlert";

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

  const strings = useStrings().connections;
  const commonStrings = useStrings().common;
  const alertStrings = useStrings().alerts;

  const [connections, setConnections] = useState(
    [...contacts].sort((a, b) => sortByFav(a, b))
  );
  const [sortType, setSortType] = useState("fav");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editConnection, setEditConnection] = useState(null);

  const [wasConnectionUpdated, setWasConnectionUpdated] = useState(false);
  const [wasConnectionDeleted, setWasConnectionDeleted] = useState(false);
  const [wasConnectionCreated, setWasConnectionCreated] = useState(false);

  useEffect(() => {
    setSortType("fav");
  }, []);

  useEffect(() => {
    const sortedConnections = sortByType(sortType, [...contacts]);
    setConnections(sortedConnections);
  }, [contacts, sortType]);

  const handleModalOpen = () => {
    setEditConnection(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditConnection(null);
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

  const connectionClickHandler = (connection) => {
    setEditConnection(connection);
    setIsModalOpen(true);
  };

  const deleteSnackAlert = (
    <SnackAlert
      alertType="success"
      message={alertStrings.connectionDeletedMessage}
      open={wasConnectionDeleted}
      close={() => setWasConnectionDeleted(false)}
    />
  );

  const updateSnackAlert = (
    <SnackAlert
      alertType="success"
      message={commonStrings.connectionUpdatedMessage}
      open={wasConnectionUpdated}
      close={() => setWasConnectionUpdated(false)}
    />
  );

  const createdSnackAlert = (
    <SnackAlert
      alertType="success"
      message={alertStrings.connectionCreatedMessage}
      open={wasConnectionCreated}
      close={() => setWasConnectionCreated(false)}
    />
  );

  return (
    <>
      <Toolbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          p: 4,
          textAlign: "center",
          overflow: "hidden",
          mx: "auto",
          marginBottom: "1.5rem",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ flexShrink: "initial" }}>
            {strings.pageName}
          </Typography>
          <FormControl sx={{ minWidth: 110 }} size="small">
            <InputLabel>{strings.sort.label}</InputLabel>
            <Select
              value={sortType}
              label={strings.sort.label}
              sx={{ minWidth: "fit-content" }}
              onChange={(e) => sortChangeHandler(e)}
            >
              <MenuItem value={"fav"}>{strings.sort.fav}</MenuItem>
              <MenuItem value={"az"}>{strings.sort.az}</MenuItem>
              <MenuItem value={"za"}>{strings.sort.za}</MenuItem>
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
              clickHandler={() => connectionClickHandler(contact)}
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
          connectionToEdit={editConnection}
          updated={setWasConnectionUpdated}
          deleted={setWasConnectionDeleted}
          created={setWasConnectionCreated}
        />
        {updateSnackAlert}
        {deleteSnackAlert}
        {createdSnackAlert}
      </Container>
    </>
  );
};

export default Connections;
