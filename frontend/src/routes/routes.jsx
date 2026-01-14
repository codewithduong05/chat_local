import { createBrowserRouter ,Navigate } from "react-router-dom";
import Login from "../pages/Login";

const router = createBrowserRouter([
  { path: "/chat", element: <Navigate to="/chat/login" replace /> },
  { path: "/chat/login", element: <Login/> },

]);

export default router