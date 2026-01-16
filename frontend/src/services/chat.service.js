// /services/chat.service.js
import { request } from "@/lib/http";

export const getRoomChat = (data) =>
  request("/api/v1/user/room", {
    method: "GET",
  });
