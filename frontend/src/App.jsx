import "./App.css";
import Header from "./components/Header/Header";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Body from "./components/Body/Body";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
      path: "/body",
      element: <Body />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
