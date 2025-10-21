import { paths } from "src/routes/paths";

export const CONFIG = {
  appName: "Hotel Data Backend",
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? "/panel",

  guestManagementServiceUrl:
    import.meta.env.VITE_GUESTMANAGEMENT_SERVICE_URL ?? "",

  roomInventoryServiceUrl: import.meta.env.VITE_ROOMINVENTORY_SERVICE_URL ?? "",

  reservationManagementServiceUrl:
    import.meta.env.VITE_RESERVATIONMANAGEMENT_SERVICE_URL ?? "",

  packageManagementServiceUrl:
    import.meta.env.VITE_PACKAGEMANAGEMENT_SERVICE_URL ?? "",

  packageReservationMappingServiceUrl:
    import.meta.env.VITE_PACKAGERESERVATIONMAPPING_SERVICE_URL ?? "",

  specialRequestManagementServiceUrl:
    import.meta.env.VITE_SPECIALREQUESTMANAGEMENT_SERVICE_URL ?? "",

  paymentManagementServiceUrl:
    import.meta.env.VITE_PAYMENTMANAGEMENT_SERVICE_URL ?? "",

  roomPricingServiceUrl: import.meta.env.VITE_ROOMPRICING_SERVICE_URL ?? "",

  feedbackManagementServiceUrl:
    import.meta.env.VITE_FEEDBACKMANAGEMENT_SERVICE_URL ?? "",

  personnelManagementServiceUrl:
    import.meta.env.VITE_PERSONNELMANAGEMENT_SERVICE_URL ?? "",

  authServiceUrl: import.meta.env.VITE_AUTH_SERVICE_URL ?? "",

  auth: {
    skip: false,
    redirectPath: "/" + paths.dashboard.root,
  },
};
