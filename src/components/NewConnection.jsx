import { AddBox, Delete, DeleteForever } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useStrings from "../hooks/useStrings";
import {
  addConnection,
  updateConnection,
  removeConnection,
} from "../store/connectionsSlice";
import { isValidEmail, isValidPhoneNumber } from "../utils/validationUtils";

const ModalPage = ({ open, onClose, connectionToEdit, updated }) => {
  const strings = useStrings().newConnections;
  const emailStrings = strings.emails;
  const phoneStrings = strings.phoneNumbers;
  const sexStrings = strings.sex;
  const alertDialogStrings = strings.deleteAlertDialog;

  const [isValidForm, setIsValidForm] = useState(false);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [emails, setEmails] = useState([""]);
  const [address, setAddress] = useState("");

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const dispatch = useDispatch();

  const theme = useTheme();
  const textAlignment = theme.direction === "rtl" ? "right" : "left";
  const styles = {
    textAlign: textAlignment,
  };

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

  const handleOpenAlert = () => {
    setOpenDeleteAlert(true);
  };
  const handleCloseAlert = () => {
    setOpenDeleteAlert(false);
  };

  const deleteConnectionHandler = () => {
    dispatch(removeConnection({ id: connectionToEdit.id }));
    setOpenDeleteAlert(false);
    onClose();
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
      updated(true);
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

  const alertDialog = (
    <Dialog
      open={openDeleteAlert}
      onClose={handleOpenAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {alertDialogStrings.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {alertDialogStrings.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseAlert}
          variant="contained"
          color="primary"
          autoFocus
        >
          {alertDialogStrings.noButtonLabel}
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={deleteConnectionHandler}
        >
          {alertDialogStrings.yesButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );

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
          sx={{ ...styles, textAlign: "right" }}
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
                  helperText={!isValidEmail(email) && emailStrings.invalidEmail}
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
        <Box
          mt={3}
          textAlign="right"
          display={"flex"}
          justifyContent={"space-between"}
        >
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

          {connectionToEdit ? (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleOpenAlert()}
            >
              <DeleteForever />
              {strings.deleteConnectionButtonLabel}
            </Button>
          ) : (
            ""
          )}
        </Box>
        {alertDialog}
      </Box>
    </Modal>
  );
};

ModalPage.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  connectionToEdit: PropTypes.object,
  updated: PropTypes.func.isRequired,
};

export default ModalPage;
