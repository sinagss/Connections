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

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          <AppBar />
          <Outlet />
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

  const direction = useSelector((state) => state.locale.direction);
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
