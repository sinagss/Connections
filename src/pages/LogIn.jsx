import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { logIn } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import users from "../constants/users";
import { Link as RouterLink } from "react-router-dom";

function Copyright(props) {
  const mySiteUrl = import.meta.env.VITE_MY_WEBSITE_URL;
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={mySiteUrl}>
        Cryware Co.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function credentialCheck(email, password) {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  return user;
}

export default function LogIn() {
  const [loginError, setLoginError] = useState(false);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const user = credentialCheck(email, password);

    if (user) {
      dispatch(logIn({ user, email: email, password: password }));
      nav("/");
    } else {
      setLoginError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={loginError}
            helperText={loginError ? "Username or password is incorrect" : ""}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <RouterLink to="/reset-pass">
                <Link variant="body2">Forgot password?</Link>
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/signup">
                <Link variant="body2">{"Don't have an account? Sign Up"}</Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
