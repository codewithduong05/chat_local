// /services/parking.service.js
import { request } from "@/lib/http";

export const getTimeParking = () =>
  request("/api/v1/parking/getTime", {
    method: "GET",
  });
