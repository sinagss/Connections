import { Grid, IconButton, Container } from "@mui/material";
import { Delete } from "@mui/icons-material";
import CustomPhoneNumber from "./UI/CustomPhoneNumber";

const DynamicPhoneFields = ({ phoneNumbersArray, onDelete }) => {
  return phoneNumbersArray.map((phoneNumber, index) => (
    <Grid container spacing={1} alignItems="flex-end" key={`number${index}`}>
      <Grid item>
        <CustomPhoneNumber />
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
