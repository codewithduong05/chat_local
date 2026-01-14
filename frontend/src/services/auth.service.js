// /services/auth.service.js
import { request } from "@/lib/http";

export const login = (data) =>
  request("/api/v1/auth/login", {
    method: "POST",
    body: data
  });
