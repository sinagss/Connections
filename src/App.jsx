import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Error from "./pages/ErrorPage";
import LogIn from "./pages/LogIn";
import AppBar from "./components/AppBar";
import AboutPage from "./pages/About";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Connections from "./pages/Connections";

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
          path: "connections",
          element: <Connections />,
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

  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
