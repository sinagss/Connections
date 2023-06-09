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
  IconButton,
} from "@mui/material";
import genders from "../constants/genders";
import { AddBox } from "@mui/icons-material";
import DynamicPhoneFields from "./DynamicPhoneFields";
import CustomPhoneNumber from "./UI/CustomPhoneNumber";

const NewConnection = ({ open, onClose, onAddContact }) => {
  const [sex, setSex] = useState("");
  const [phoneNumbersArray, setPhoneNumbersArray] = useState([]);
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

  const addPhoneNumber = () => {
    setPhoneNumbersArray([...phoneNumbersArray, ""]);
  };

  const dynamicPhoneNumberChangeHandler = (index, event) => {
    const updatedNumbers = phoneNumbersArray.map((number, i) =>
      i === index ? event.target.value : number
    );
    setPhoneNumbersArray(updatedNumbers);
  };

  const deletePhoneNumberHandler = (phoneNumber) => {
    setPhoneNumbersArray((prevNumbers) =>
      prevNumbers.filter((item) => item !== phoneNumber)
    );
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
          maxWidth: 500,
          width: "100%",
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
          id="firstName"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={newContact.lastName}
          onChange={handleInputChange}
          id="lastName"
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

        <CustomPhoneNumber />

        <DynamicPhoneFields
          phoneNumbersArray={phoneNumbersArray}
          dynamicPhoneNumberChangeHandler={dynamicPhoneNumberChangeHandler}
          deletePhoneNumberHandler={deletePhoneNumberHandler}
        />

        <IconButton aria-label="add phone number" onClick={addPhoneNumber}>
          <AddBox className="text-theme-blue" />
        </IconButton>

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
