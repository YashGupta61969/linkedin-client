import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { addToken, addUser } from "./store/slices/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (user) {
      dispatch(addUser(user))
    }
  }, [user])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
