import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import ResponsiveLayout from "@/layouts/ResponsiveLayout";
import ChatWindowUI from "@/features/chat/ChatWindow";

const router = createBrowserRouter([
  { path: "/", element: <div>Hell World</div> },
  { path: "/chat/login", element: <Login /> },
  {
    path: "/chat", element:
      <ResponsiveLayout>
        <ChatWindowUI />
      </ResponsiveLayout>
  }

]);

export default router