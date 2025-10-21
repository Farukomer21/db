const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

export const paths = {
  auth: {
    login: `/`,
  },

  dashboard: {
    root: ROOTS.DASHBOARD,

    guestManagement: {
      root: `${ROOTS.DASHBOARD}/guestManagement`,

      guest: `${ROOTS.DASHBOARD}/guestManagement/guest`,
    },

    roomInventory: {
      root: `${ROOTS.DASHBOARD}/roomInventory`,

      room: `${ROOTS.DASHBOARD}/roomInventory/room`,
    },

    reservationManagement: {
      root: `${ROOTS.DASHBOARD}/reservationManagement`,

      reservation: `${ROOTS.DASHBOARD}/reservationManagement/reservation`,
    },

    packageManagement: {
      root: `${ROOTS.DASHBOARD}/packageManagement`,

      package_: `${ROOTS.DASHBOARD}/packageManagement/package_`,
    },

    packageReservationMapping: {
      root: `${ROOTS.DASHBOARD}/packageReservationMapping`,

      packageReservation: `${ROOTS.DASHBOARD}/packageReservationMapping/packageReservation`,
    },

    specialRequestManagement: {
      root: `${ROOTS.DASHBOARD}/specialRequestManagement`,

      specialRequest: `${ROOTS.DASHBOARD}/specialRequestManagement/specialRequest`,
    },

    paymentManagement: {
      root: `${ROOTS.DASHBOARD}/paymentManagement`,

      payment: `${ROOTS.DASHBOARD}/paymentManagement/payment`,
    },

    roomPricing: {
      root: `${ROOTS.DASHBOARD}/roomPricing`,

      roomPrice: `${ROOTS.DASHBOARD}/roomPricing/roomPrice`,
    },

    feedbackManagement: {
      root: `${ROOTS.DASHBOARD}/feedbackManagement`,

      feedback: `${ROOTS.DASHBOARD}/feedbackManagement/feedback`,
    },

    personnelManagement: {
      root: `${ROOTS.DASHBOARD}/personnelManagement`,

      personnel: `${ROOTS.DASHBOARD}/personnelManagement/personnel`,
    },

    auth: {
      root: `${ROOTS.DASHBOARD}/auth`,

      user: `${ROOTS.DASHBOARD}/auth/user`,
    },
  },
};
