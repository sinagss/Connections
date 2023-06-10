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
        Sign Up
      </Typography>
      <form onSubmit={handleSignup}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
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
              label="Last Name"
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
              label="Age"
              type="number"
              fullWidth
              required
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                validateForm();
              }}
              error={age < 10 || age > 100}
              helperText={
                (age < 10 || age > 100) && "Age must be between 10 and 100"
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Sex</InputLabel>
              <Select
                value={sex}
                onChange={(e) => {
                  setSex(e.target.value);
                  validateForm();
                }}
                label="Sex"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
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
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateForm();
              }}
              error={email && !isValidEmail(email)}
              helperText={email && !isValidEmail(email) && "Invalid email"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
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
                password.length > 0 && password.length < 3 && "Invalid password"
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  validateForm();
                }}
                label="Type"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
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
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="body2" align="center" mt={2}>
        Already have an account?{" "}
        <RouterLink to="/login">
          <Link color="primary">Log In</Link>
        </RouterLink>
      </Typography>
    </Container>
  );
};

export default SignUp;
