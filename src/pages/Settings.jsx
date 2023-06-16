import { useState } from "react";
import {
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
  Box,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import useStrings from "../hooks/useStrings";
import { useEffect } from "react";
import LanguageSelect from "../components/UI/LanguageSelect";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
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

  const strings = useStrings().settings;

  const direction = useSelector((state) => state.locale.direction);

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  const handleDarkModeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  return (
    <>
      <Toolbar />
      <StyledContainer maxWidth="sm" dir={direction}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledTitle variant="h5" align="center" gutterBottom>
            {strings.pageLabel}
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
              label={strings.darkModeLabel}
            />
            <LanguageSelect />
          </StyledFormGroup>
        </Box>
      </StyledContainer>
    </>
  );
};

export default Settings;
