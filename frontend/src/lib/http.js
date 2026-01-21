// lib/http.js

import { ENV } from "@/config/env.js";

export const request = async (url, options = {}) => {
  const token = options.token ?? localStorage.getItem("token");
  const method = (options.method || "GET").toUpperCase();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const fetchOptions = {
    ...options,
    method,
    headers,
  };

  // Không gửi body cho GET / HEAD
  if (method === "GET" || method === "HEAD") {
    delete fetchOptions.body;
  } else if (options.body !== undefined) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const res = await fetch(`${ENV.API_URL}${url}`, fetchOptions);

  // Thử parse JSON, fallback về text
  let payload;
  try {
    payload = await res.json();
  } catch (e) {
    payload = await res.text();
  }

  if (!res.ok) {
    // // Nếu 401 thì có thể logout/clear token
    // if (res.status === 401) {
    //   localStorage.removeItem("token");
    // }

    const error = new Error(payload?.message || payload || "Request failed");
    error.status = res.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};
