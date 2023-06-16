import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { isValidEmail } from "../utils/validationUtils.js";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../store/authSlice.js";
import { useEffect } from "react";
import { useCallback } from "react";
import useStrings from "../hooks/useStrings.js";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const newUser = {
    firstName,
    lastName,
    age,
    sex,
    username,
    email,
    password,
    type,
  };

  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signUpUser(newUser));
    nav("/");
  };

  const validateForm = useCallback(() => {
    const isValid =
      firstName &&
      lastName &&
      age >= 10 &&
      age <= 100 &&
      sex &&
      username.length >= 3 &&
      email &&
      isValidEmail(email) &&
      password.length >= 3 &&
      type;
    setIsFormValid(isValid);
  }, [firstName, lastName, age, sex, username, email, password, type]);

  const strings = useStrings().signup;
  const typeStrings = strings.type;
  const sexStrings = strings.sex;

  useEffect(() => {
    validateForm();
  }, [
    firstName,
    lastName,
    age,
    sex,
    username,
    email,
    password,
    type,
    validateForm,
  ]);

  return (
    <Container maxWidth="sm">
      <Toolbar />
      <Typography variant="h4" align="center" gutterBottom>
        {strings.pageTitle}
      </Typography>
      <form onSubmit={handleSignup}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={strings.firtNameLabel}
              fullWidth
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                validateForm();
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={strings.lastNameLabel}
              fullWidth
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                validateForm();
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={strings.ageLabel}
              type="number"
              fullWidth
              required
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                validateForm();
              }}
              error={age < 10 || age > 100}
              helperText={(age < 10 || age > 100) && strings.ageError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>{sexStrings.label}</InputLabel>
              <Select
                value={sex}
                onChange={(e) => {
                  setSex(e.target.value);
                  validateForm();
                }}
                label={sexStrings.label}
              >
                <MenuItem value="male">{sexStrings.male}</MenuItem>
                <MenuItem value="female">{sexStrings.female}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={strings.usernameLabel}
              fullWidth
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateForm();
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={strings.emailLabel}
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateForm();
              }}
              error={email && !isValidEmail(email)}
              helperText={email && !isValidEmail(email) && strings.emailError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={strings.passwordLabel}
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateForm();
              }}
              error={password.length > 0 && password.length < 3}
              helperText={
                password.length > 0 &&
                password.length < 3 &&
                strings.passwordError
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>{typeStrings.label}</InputLabel>
              <Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  validateForm();
                }}
                label={typeStrings.label}
              >
                <MenuItem value="user">{typeStrings.user}</MenuItem>
                <MenuItem value="admin">{typeStrings.admin}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isFormValid}
            >
              {strings.signupButtonLabel}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="body2" align="center" mt={2}>
        {strings.haveAccount}
        <RouterLink to="/login" className="mx-1">
          <Link color="primary">{strings.login}</Link>
        </RouterLink>
      </Typography>
    </Container>
  );
};

export default SignUp;
