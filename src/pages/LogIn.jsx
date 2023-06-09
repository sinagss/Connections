import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useStrings from "../hooks/useStrings";
import { logIn } from "../store/authSlice";
import SnackAlert from "../components/UI/SnackAlert";

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

function credentialCheck(systemUsers, email, password) {
  const user = systemUsers.find(
    (user) => user.email === email && user.password === password
  );
  return user;
}

export default function LogIn() {
  const [loginError, setLoginError] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const systemUsers = useSelector((state) => state.authenticator.systemUsers);

  const strings = useStrings().login;
  const commonStrings = useStrings().common;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const user = credentialCheck(systemUsers, email, password);

    if (user) {
      dispatch(logIn({ user, email: email, password: password }));
      nav("/");
    } else {
      setLoginError(true);
      setOpenErrorAlert(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <SnackAlert
        alertType="error"
        message={commonStrings.loginErrorMessage}
        open={openErrorAlert}
        close={setOpenErrorAlert}
      />
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
          {strings.signinLabel}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={loginError}
            helperText={loginError ? strings.loginError : ""}
            margin="normal"
            required
            fullWidth
            id="email"
            label={strings.emailLabel}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={strings.passwordLabel}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {strings.signinLabel}
          </Button>
          <Grid container>
            <Grid item xs>
              <RouterLink to="/reset-pass">
                <Link variant="body2">{strings.forgotPasswordLabel}</Link>
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/signup">
                <Link variant="body2">{strings.noAccountLabel}</Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
