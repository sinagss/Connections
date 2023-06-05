import { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import genders from "../constants/genders";

const NewConnection = ({ open, onClose, onAddContact }) => {
  const [sex, setSex] = useState("");
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleAddContact = () => {
    onAddContact(newContact);
    setNewContact({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    });
  };

  const sexChangeHandler = (event) => {
    setSex(event.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          outline: "none",
          borderRadius: 3,
          maxWidth: 300,
          width: "100%",
          m: "auto",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          New Connection
        </Typography>
        <TextField
          name="firstName"
          label="First Name"
          value={newContact.firstName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={newContact.lastName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth required sx={{ maxWidth: 120 }}>
          <InputLabel>Sex</InputLabel>
          <Select label="Sex" value={sex} onChange={sexChangeHandler}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genders.map((gender, index) => (
              <MenuItem key={index} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={newContact.phoneNumber}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email Address"
          value={newContact.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddContact} sx={{ mt: 2 }}>
          Add Connection
        </Button>
      </Box>
    </Modal>
  );
};

NewConnection.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddContact: PropTypes.func.isRequired,
};

export default NewConnection;
