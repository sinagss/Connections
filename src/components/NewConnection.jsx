import { forwardRef, useState } from "react";
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
  Input,
  IconButton,
  Container,
} from "@mui/material";
import genders from "../constants/genders";
import { IMaskInput } from "react-imask";
import { AddBox, Delete } from "@mui/icons-material";
import DynamicPhoneFields from "./DynamicPhoneFields";

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  const masks = [
    { mask: "+{98}(00) 00-000000" },
    { mask: "+{98}(#90) 0000000" },
  ];
  return (
    <IMaskInput
      {...other}
      mask={masks}
      lazy={false}
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      displayChar="+"
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const NewConnection = ({ open, onClose, onAddContact }) => {
  const [sex, setSex] = useState("");
  const [phoneNumbersArray, setPhoneNumbersArray] = useState([]);
  const [values, setValues] = useState({
    textmask: "",
    numberformat: "1320",
  });
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const phoneChangeHandler = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

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
    setPhoneNumbersArray(
      phoneNumbersArray.filter((item) => item !== phoneNumber)
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className="absolute left-1/2 top-1/2 mx-5"
        sx={{
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

        <Grid container className="flex-grow items-end">
          <Grid item>
            <FormControl variant="standard">
              <InputLabel htmlFor="formatted-text-mask-input">
                Phone Number
              </InputLabel>
              <Input
                value={values.textmask}
                name="textmask"
                onChange={phoneChangeHandler}
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Container>
              <IconButton aria-label="delete phone number">
                <Delete className="text-theme-red" />
              </IconButton>
            </Container>
          </Grid>
          <Grid item>
            <IconButton aria-label="add phone number" onClick={addPhoneNumber}>
              <AddBox className="text-theme-blue" />
            </IconButton>
          </Grid>
        </Grid>

        <DynamicPhoneFields
          phoneNumbersArray={phoneNumbersArray}
          onChange={dynamicPhoneNumberChangeHandler}
          onDelete={deletePhoneNumberHandler}
        />

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
