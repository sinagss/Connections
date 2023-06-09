import { useState } from "react";
import {
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneNumberInput = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const [validities, setValidities] = useState([]);

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
    setValidities([...validities, true]);
  };

  const handlePhoneNumberChange = (index, value) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setPhoneNumbers(updatedPhoneNumbers);

    const updatedValidities = [...validities];
    updatedValidities[index] = isValidPhoneNumber(value);
    setValidities(updatedValidities);
  };

  const removePhoneNumber = (index) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers.splice(index, 1);
    setPhoneNumbers(updatedPhoneNumbers);

    const updatedValidities = [...validities];
    updatedValidities.splice(index, 1);
    setValidities(updatedValidities);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {phoneNumbers.map((phoneNumber, index) => (
        <Grid
          container
          spacing={1}
          alignItems="center"
          key={index}
          style={{ marginBottom: "16px" }}
        >
          <Grid item xs={10}>
            <FormControl
              variant={validities[index] ? "standard" : "filled"}
              style={{ width: "100%" }}
            >
              <InputLabel
                htmlFor={`phone-number-${index}`}
                position="top"
                style={{
                  color: validities[index] ? "inherit" : "#f44336",
                }}
              >
                Phone Number
              </InputLabel>
              <PhoneInput
                id={`phone-number-${index}`}
                value={phoneNumber}
                onChange={(value) => handlePhoneNumberChange(index, value)}
                defaultCountry="US"
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              aria-label="remove phone number"
              onClick={() => removePhoneNumber(index)}
            >
              <Remove />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Box display="flex" justifyContent="flex-start" marginBottom="16px">
        <Button variant="outlined" startIcon={<Add />} onClick={addPhoneNumber}>
          Add Phone Number
        </Button>
      </Box>

      <Typography variant="body2" color="error">
        {validities.includes(false) &&
          "Please enter valid phone numbers for all fields."}
      </Typography>
    </div>
  );
};

export default PhoneNumberInput;
