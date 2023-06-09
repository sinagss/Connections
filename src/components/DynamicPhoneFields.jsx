import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  Container,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const DynamicPhoneFields = ({ phoneNumbersArray, onChange, onDelete }) => {
  return phoneNumbersArray.map((phoneNumber, index) => (
    <Grid container spacing={1} alignItems="flex-end" key={`number${index}`}>
      <Grid item>
        <FormControl variant="standard">
          <InputLabel htmlFor={`formatted-text-mask-input-${index}`}>
            Phone Number
          </InputLabel>
          <Input
            value={phoneNumber}
            name={`phoneNumber${index}`}
            onChange={(event) => onChange(index, event)}
            id={`formatted-text-mask-input-${index}`}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Container>
          <IconButton
            aria-label="delete phone number"
            onClick={() => onDelete(phoneNumber)}
          >
            <Delete className="text-theme-red" />
          </IconButton>
        </Container>
      </Grid>
    </Grid>
  ));
};

export default DynamicPhoneFields;
