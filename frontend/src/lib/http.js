// lib/http.js

import { ENV } from "@/config/env.js";

export const request = async (url, options = {}) => {
  const res = await fetch(`${ENV.API_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!res.ok) throw new Error("Request failed");
  return res.json();
};
