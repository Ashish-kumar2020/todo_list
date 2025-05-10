import "./App.css";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Body from "./components/Body/Body";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import StickyWall from "./components/StickyWall/StickyWall";
import CreateTodo from "./components/Todo/CreateTodo";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Profile/Profile";
import ErrorPage from "./components/Error/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Signin />,
    },
    {
      path: "/home",
      element: <Body />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "stickywall",
          element: <StickyWall />,
        },
        {
          path: "createTodo",
          element: <CreateTodo />,
        },
        {
          path: "profile",
          element: <Profile />,
        },

        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },

    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
