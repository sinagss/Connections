import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeLocale } from "../../store/localSlice";
import useStrings from "../../hooks/useStrings";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: theme.spacing(2),
  minWidth: 200,
}));

const LanguageSelect = () => {
  const [language, setLanguage] = useState(
    useSelector((state) => state.locale.locale)
  );
  const strings = useStrings().settings;
  const languageString = strings.language;
  const dispatch = useDispatch();

  const direction = useSelector((state) => state.locale.direction);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    dispatch(changeLocale({ updatedLocale: event.target.value }));
  };

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  return (
    <StyledContainer maxWidth="sm" dir={direction}>
      <StyledFormControl>
        <FormControl>
          <InputLabel>{languageString.label}</InputLabel>
          <Select
            value={language}
            onChange={handleLanguageChange}
            label={languageString.label}
          >
            <MenuItem value="en">{languageString.englishLabel}</MenuItem>
            <MenuItem value="fr">{languageString.persianLabel}</MenuItem>
          </Select>
        </FormControl>
      </StyledFormControl>
    </StyledContainer>
  );
};

export default LanguageSelect;
