// /services/chat.service.js
import { request } from "@/lib/http";

export const getChat = (data) =>
  request("/api/v1/auth/login", {
    method: "POST",
    body: data
  });
