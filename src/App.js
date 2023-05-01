import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { addUser } from "./store/slices/userSlice";
import { useEffect } from "react";
import PostPage from "./pages/post/PostPage";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Myprofile from "./pages/profile/Myprofile";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.token) {
      dispatch(addUser(user))
    }
  }, [user?.token])

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
    {
      path: '/post/:id',
      element: <PostPage />
    },
    {
      path: '/myprofile',
      element: <Myprofile />
    },
  ]);
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
