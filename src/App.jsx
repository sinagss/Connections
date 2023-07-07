import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar";
import AboutPage from "./pages/About";
import Connections from "./pages/Connections";
import Error from "./pages/ErrorPage";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import RTLProvider from "./providers/RTLProvider";
import SnackAlert from "./components/UI/SnackAlert";
import { useState } from "react";
import useStrings from "./hooks/useStrings";
import { useEffect } from "react";
import InstallSnackBar from "./components/UI/InstallSnackBar";

function App() {
  const login = useSelector((state) => state.authenticator.isLoggedIn);

  const [loginAlert, setLoginAlert] = useState(false);
  const [logoutAlert, setLogoutAlert] = useState(!login);
  const alertStrings = useStrings().alerts;

  const direction = useSelector((state) => state.locale.direction);

  useEffect(() => {
    document.dir = direction;
  });

  useEffect(() => {
    if (login) {
      setLoginAlert(true);
      setLogoutAlert(false);
    } else {
      setLoginAlert(false);
      setLogoutAlert(true);
    }
  }, [login]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          <AppBar />
          <Outlet />
          {loginAlert && (
            <SnackAlert
              alertType="success"
              message={alertStrings.loginSuccessMessage}
              open={loginAlert}
              close={() => setLoginAlert(false)}
            />
          )}
          {logoutAlert && (
            <SnackAlert
              alertType="info"
              message={alertStrings.logoutMessage}
              open={logoutAlert}
              close={() => setLogoutAlert(false)}
            />
          )}
          <InstallSnackBar />
        </>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
          errorElement: <Error />,
        },
        {
          path: "login",
          element: <LogIn />,
          errorElement: <Error />,
        },
        {
          path: "signup",
          element: <SignUp />,
          errorElement: <Error />,
        },
        {
          path: "connections",
          element: <Connections />,
          errorElement: <Error />,
        },
        {
          path: "settings",
          element: <Settings />,
          errorElement: <Error />,
        },
        {
          path: "about",
          element: <AboutPage />,
          errorElement: <Error />,
        },
      ],
    },
  ]);

  const theme = createTheme({ direction });

  return (
    <RTLProvider direction={direction}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </RTLProvider>
  );
}

export default App;
