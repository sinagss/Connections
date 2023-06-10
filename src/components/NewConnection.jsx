import { useEffect, useState } from "react";
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
  Grid,
  IconButton,
} from "@mui/material";
import { AddBox, Delete } from "@mui/icons-material";
import { isValidEmail, isValidPhoneNumber } from "../utils/validationUtils";
import { useDispatch } from "react-redux";
import { addConnection } from "../store/connectionsSlice";

const ModalPage = ({ open, onClose }) => {
  const [isValidForm, setIsValidForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [emails, setEmails] = useState([""]);
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const handleDeletePhoneNumber = (index) => {
    const updatedPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handlePhoneNumberChange = (index, value) => {
    const updatedPhoneNumbers = phoneNumbers.map((phoneNumber, i) =>
      i === index ? value : phoneNumber
    );
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleDeleteEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = emails.map((email, i) =>
      i === index ? value : email
    );
    setEmails(updatedEmails);
  };

  const handleSubmit = () => {
    const contactInfo = {
      firstName,
      lastName,
      age,
      sex,
      phoneNumbers,
      emails,
      address,
    };
    dispatch(addConnection(contactInfo));
    onClose();
  };

  useEffect(() => {
    const isValid =
      firstName && lastName && age && sex && emails.every(isValidEmail);
    setIsValidForm(isValid);
  }, [firstName, lastName, age, sex, emails]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxHeight: "80%",
          p: 4,
          bgcolor: "background.paper",
          boxShadow: 24,
          overflow: "auto",
          borderRadius: "5px",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Contact Information
        </Typography>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth required>
          <InputLabel>Sex</InputLabel>
          <Select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            label="Sex"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <Box mt={3}>
          <Typography variant="subtitle1">Phone Numbers</Typography>
          {phoneNumbers.map((phoneNumber, index) => (
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={`phoneNumber${index}`}
            >
              <Grid item xs={9}>
                <TextField
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) =>
                    handlePhoneNumberChange(index, e.target.value)
                  }
                  fullWidth
                  margin="normal"
                  error={!isValidPhoneNumber(phoneNumber)}
                  helperText={
                    !isValidPhoneNumber(phoneNumber) && "Invalid phone number"
                  }
                />
              </Grid>
              <Grid item xs={3}>
                {index === phoneNumbers.length - 1 && (
                  <IconButton
                    onClick={handleAddPhoneNumber}
                    aria-label="Add Phone Number"
                  >
                    <AddBox />
                  </IconButton>
                )}
                {index !== phoneNumbers.length - 1 && (
                  <IconButton
                    onClick={() => handleDeletePhoneNumber(index)}
                    aria-label="Delete Phone Number"
                  >
                    <Delete />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </Box>
        <Box mt={3}>
          <Typography variant="subtitle1">Emails</Typography>
          {emails.map((email, index) => (
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={`email${index}`}
            >
              <Grid item xs={9}>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  fullWidth
                  margin="normal"
                  error={!isValidEmail(email)}
                  helperText={!isValidEmail(email) && "Invalid email"}
                />
              </Grid>
              <Grid item xs={3}>
                {index === emails.length - 1 && (
                  <IconButton onClick={handleAddEmail} aria-label="Add Email">
                    <AddBox />
                  </IconButton>
                )}
                {index !== emails.length - 1 && (
                  <IconButton
                    onClick={() => handleDeleteEmail(index)}
                    aria-label="Delete Email"
                  >
                    <Delete />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </Box>
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box mt={3} textAlign="right">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isValidForm}
          >
            Add to Contacts
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ModalPage.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalPage;
