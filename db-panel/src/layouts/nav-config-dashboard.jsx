import { paths } from "src/routes/paths";

import { CONFIG } from "src/global-config";

import { SvgColor } from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  folder: icon("ic-folder"),
  dashboard: icon("ic-dashboard"),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    items: [
      {
        title: "Admin Panel",
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
      },
    ],
  },
  {
    subheader: "Modules",
    items: [
      {
        title: "GuestManagement Module",
        path: paths.dashboard.guestManagement.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Guest Data",
            path: paths.dashboard.guestManagement.guest,
          },
        ],
      },

      {
        title: "RoomInventory Module",
        path: paths.dashboard.roomInventory.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Room Data",
            path: paths.dashboard.roomInventory.room,
          },
        ],
      },

      {
        title: "ReservationManagement Module",
        path: paths.dashboard.reservationManagement.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Reservation Data",
            path: paths.dashboard.reservationManagement.reservation,
          },
        ],
      },

      {
        title: "PackageManagement Module",
        path: paths.dashboard.packageManagement.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Package_ Data",
            path: paths.dashboard.packageManagement.package_,
          },
        ],
      },

      {
        title: "PackageReservationMapping Module",
        path: paths.dashboard.packageReservationMapping.root,
        icon: ICONS.folder,

        children: [
          {
            title: "PackageReservation Data",
            path: paths.dashboard.packageReservationMapping.packageReservation,
          },
        ],
      },

      {
        title: "SpecialRequestManagement Module",
        path: paths.dashboard.specialRequestManagement.root,
        icon: ICONS.folder,

        children: [
          {
            title: "SpecialRequest Data",
            path: paths.dashboard.specialRequestManagement.specialRequest,
          },
        ],
      },

      {
        title: "PaymentManagement Module",
        path: paths.dashboard.paymentManagement.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Payment Data",
            path: paths.dashboard.paymentManagement.payment,
          },
        ],
      },

      {
        title: "RoomPricing Module",
        path: paths.dashboard.roomPricing.root,
        icon: ICONS.folder,

        children: [
          {
            title: "RoomPrice Data",
            path: paths.dashboard.roomPricing.roomPrice,
          },
        ],
      },

      {
        title: "FeedbackManagement Module",
        path: paths.dashboard.feedbackManagement.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Feedback Data",
            path: paths.dashboard.feedbackManagement.feedback,
          },
        ],
      },

      {
        title: "PersonnelManagement Module",
        path: paths.dashboard.personnelManagement.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Personnel Data",
            path: paths.dashboard.personnelManagement.personnel,
          },
        ],
      },

      {
        title: "Auth Module",
        path: paths.dashboard.auth.root,
        icon: ICONS.folder,

        children: [
          {
            title: "User Data",
            path: paths.dashboard.auth.user,
          },
        ],
      },
    ],
  },
];
