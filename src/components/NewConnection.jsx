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
import { addConnection, updateConnection } from "../store/connectionsSlice";
import useStrings from "../hooks/useStrings";

const ModalPage = ({ open, onClose, connectionToEdit }) => {
  const strings = useStrings().newConnections;
  const emailStrings = strings.emails;
  const phoneStrings = strings.phoneNumbers;
  const sexStrings = strings.sex;

  const [isValidForm, setIsValidForm] = useState(false);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [emails, setEmails] = useState([""]);
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (connectionToEdit) {
      setId(connectionToEdit.id);
      setFirstName(connectionToEdit.firstName);
      setLastName(connectionToEdit.lastName);
      setAge(connectionToEdit.age);
      setSex(connectionToEdit.sex);
      setPhoneNumbers(connectionToEdit.phoneNumbers);
      setEmails(connectionToEdit.emails);
      setAddress(connectionToEdit.address);
    }
  }, [connectionToEdit]);

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
      id,
      firstName,
      lastName,
      age,
      sex,
      phoneNumbers,
      emails,
      address,
    };
    if (connectionToEdit) {
      dispatch(updateConnection({ id: contactInfo.id, contactInfo }));
    } else {
      dispatch(addConnection(contactInfo));
    }
    setId("");
    setFirstName("");
    setLastName("");
    setAge("");
    setSex("");
    setPhoneNumbers([]);
    setEmails([]);
    setAddress("");

    onClose();
  };

  const modalCloseHandler = () => {
    setId("");
    setFirstName("");
    setLastName("");
    setAge("");
    setSex("");
    setPhoneNumbers([""]);
    setEmails([""]);
    setAddress("");

    onClose();
  };

  useEffect(() => {
    const isValid =
      firstName && lastName && age && sex && emails.every(isValidEmail);
    setIsValidForm(isValid);
  }, [firstName, lastName, age, sex, emails]);

  return (
    <Modal open={open} onClose={modalCloseHandler}>
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
          {strings.titleLabel}
        </Typography>
        <TextField
          label={strings.firstNameLabel}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label={strings.lastNameLabel}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label={strings.ageLabel}
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth required>
          <InputLabel>{sexStrings.label}</InputLabel>
          <Select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            label={sexStrings.label}
          >
            <MenuItem value="male">{sexStrings.male}</MenuItem>
            <MenuItem value="female">{sexStrings.female}</MenuItem>
          </Select>
        </FormControl>
        <Box mt={3}>
          <Typography variant="subtitle1">
            {phoneStrings.phoneSectionLabel}
          </Typography>
          {phoneNumbers.map((phoneNumber, index) => (
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={`phoneNumber${index}`}
            >
              <Grid item xs={9}>
                <TextField
                  label={phoneStrings.phoneLabel}
                  autoComplete={`phoneNumber${index}`}
                  value={phoneNumber}
                  onChange={(e) =>
                    handlePhoneNumberChange(index, e.target.value)
                  }
                  fullWidth
                  margin="normal"
                  error={!isValidPhoneNumber(phoneNumber)}
                  helperText={
                    !isValidPhoneNumber(phoneNumber) &&
                    phoneStrings.invalidPhone
                  }
                />
              </Grid>
              <Grid item xs={3}>
                {index === phoneNumbers.length - 1 && (
                  <IconButton
                    onClick={handleAddPhoneNumber}
                    aria-label={phoneStrings.addPhoneNumberLabel}
                  >
                    <AddBox />
                  </IconButton>
                )}
                {index !== phoneNumbers.length - 1 && (
                  <IconButton
                    onClick={() => handleDeletePhoneNumber(index)}
                    aria-label={phoneStrings.deletePhoneNumberLabel}
                  >
                    <Delete />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </Box>
        <Box mt={3}>
          <Typography variant="subtitle1">
            {emailStrings.emailsSectionLabel}
          </Typography>
          {emails.map((email, index) => (
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={`email${index}`}
            >
              <Grid item xs={9}>
                <TextField
                  label={emailStrings.emailLabel}
                  value={email}
                  key={`new-email-${index}`}
                  type="email"
                  autoComplete={`email-${index}`}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  fullWidth
                  margin="normal"
                  error={!isValidEmail(email)}
                  helperText={!isValidEmail(email) && "Invalid email"}
                />
              </Grid>
              <Grid item xs={3}>
                {index === emails.length - 1 && (
                  <IconButton
                    onClick={handleAddEmail}
                    aria-label={emailStrings.addEmailLabel}
                  >
                    <AddBox />
                  </IconButton>
                )}
                {index !== emails.length - 1 && (
                  <IconButton
                    onClick={() => handleDeleteEmail(index)}
                    aria-label={emailStrings.deleteEmailLabel}
                  >
                    <Delete />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </Box>
        <TextField
          label={strings.addressLabel}
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
            {connectionToEdit
              ? strings.updateConnection
              : strings.addNewConnection}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ModalPage.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  connectionToEdit: PropTypes.object,
};

export default ModalPage;
