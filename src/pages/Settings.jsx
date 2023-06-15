import { useState } from "react";
import {
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { changeLocale } from "../store/localSlice";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: theme.spacing(2),
  minWidth: 200,
}));

const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

const StyledSwitchLabel = styled(FormControlLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState(
    useSelector((state) => state.locale.locale)
  );

  const dispatch = useDispatch();

  const handleDarkModeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    dispatch(changeLocale({ updatedLocale: event.target.value }));
  };

  return (
    <>
      <Toolbar />
      <StyledContainer maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledTitle variant="h5" align="center" gutterBottom>
            App Settings
          </StyledTitle>
          <StyledFormGroup>
            <StyledSwitchLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleDarkModeChange}
                  color="primary"
                />
              }
              label="Dark Mode"
            />
          </StyledFormGroup>
          <StyledFormControl>
            <InputLabel>Language</InputLabel>
            <Select value={language} onChange={handleLanguageChange}>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">Persian</MenuItem>
            </Select>
          </StyledFormControl>
        </Box>
      </StyledContainer>
    </>
  );
};

export default Settings;
