import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import ResponsiveLayout from "@/layouts/ResponsiveLayout";
import ChatWindowUI from "@/features/chat/ChatWindow";
import ChatAdmin from "@/pages/ChatAdmin";
import ParkingDashboard from "@/features/parking/dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/chat/login", element: <Login /> },
  {path:"/chat/admin", element: <ChatAdmin/>},
  {
    path: "/chat", element:
      <ResponsiveLayout>
        <ChatWindowUI />
      </ResponsiveLayout>
  },
  { path: "/parking_lot", element: < ParkingDashboard /> },

]);

export default router