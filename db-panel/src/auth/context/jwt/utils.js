import authAxios from "src/lib/auth-axios";
import roomPricingAxios from "src/lib/roomPricing-axios";
import roomInventoryAxios from "src/lib/roomInventory-axios";
import guestManagementAxios from "src/lib/guestManagement-axios";
import packageManagementAxios from "src/lib/packageManagement-axios";
import paymentManagementAxios from "src/lib/paymentManagement-axios";
import feedbackManagementAxios from "src/lib/feedbackManagement-axios";
import personnelManagementAxios from "src/lib/personnelManagement-axios";
import reservationManagementAxios from "src/lib/reservationManagement-axios";
import specialRequestManagementAxios from "src/lib/specialRequestManagement-axios";
import packageReservationMappingAxios from "src/lib/packageReservationMapping-axios";

import { JWT_STORAGE_KEY } from "./constant";

export function jwtDecode(token) {
  try {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length < 2) {
      throw new Error("Invalid token!");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error;
  }
}

export function isValidToken(accessToken) {
  if (!accessToken) {
    return false;
  }

  try {
    return jwtDecode(accessToken);
  } catch (error) {
    console.error("Error during token validation:", error);
    return false;
  }
}

export async function setSession(accessToken) {
  try {
    if (accessToken) {
      sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);

      guestManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      roomInventoryAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      reservationManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      packageManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      packageReservationMappingAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      specialRequestManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      paymentManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      roomPricingAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      feedbackManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      personnelManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      authAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      const decodedToken = jwtDecode(accessToken);

      if (!decodedToken) {
        throw new Error("Invalid access token!");
      }
      return decodedToken;
    } else {
      sessionStorage.removeItem(JWT_STORAGE_KEY);

      delete guestManagementAxios.defaults.headers.common.Authorization;

      delete roomInventoryAxios.defaults.headers.common.Authorization;

      delete reservationManagementAxios.defaults.headers.common.Authorization;

      delete packageManagementAxios.defaults.headers.common.Authorization;

      delete packageReservationMappingAxios.defaults.headers.common
        .Authorization;

      delete specialRequestManagementAxios.defaults.headers.common
        .Authorization;

      delete paymentManagementAxios.defaults.headers.common.Authorization;

      delete roomPricingAxios.defaults.headers.common.Authorization;

      delete feedbackManagementAxios.defaults.headers.common.Authorization;

      delete personnelManagementAxios.defaults.headers.common.Authorization;

      delete authAxios.defaults.headers.common.Authorization;

      return null;
    }
  } catch (error) {
    console.error("Error during set session:", error);
    throw error;
  }
}
