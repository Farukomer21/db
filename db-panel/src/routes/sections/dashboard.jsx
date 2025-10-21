import { Outlet } from "react-router";
import { lazy, Suspense } from "react";

import { CONFIG } from "src/global-config";
import { DashboardLayout, DataObjectLayout } from "src/layouts/dashboard";

import { LoadingScreen } from "src/components/loading-screen";

import { AuthGuard } from "src/auth/guard";

import { usePathname } from "../hooks";

const IndexPage = lazy(() => import("src/pages/dashboard"));

const GuestManagementGuestAppPage = lazy(
  () => import("src/pages/dashboard/guestmanagement/guest"),
);

const RoomInventoryRoomAppPage = lazy(
  () => import("src/pages/dashboard/roominventory/room"),
);

const ReservationManagementReservationAppPage = lazy(
  () => import("src/pages/dashboard/reservationmanagement/reservation"),
);

const PackageManagementPackage_AppPage = lazy(
  () => import("src/pages/dashboard/packagemanagement/package_"),
);

const PackageReservationMappingPackageReservationAppPage = lazy(
  () =>
    import("src/pages/dashboard/packagereservationmapping/packagereservation"),
);

const SpecialRequestManagementSpecialRequestAppPage = lazy(
  () => import("src/pages/dashboard/specialrequestmanagement/specialrequest"),
);

const PaymentManagementPaymentAppPage = lazy(
  () => import("src/pages/dashboard/paymentmanagement/payment"),
);

const RoomPricingRoomPriceAppPage = lazy(
  () => import("src/pages/dashboard/roompricing/roomprice"),
);

const FeedbackManagementFeedbackAppPage = lazy(
  () => import("src/pages/dashboard/feedbackmanagement/feedback"),
);

const PersonnelManagementPersonnelAppPage = lazy(
  () => import("src/pages/dashboard/personnelmanagement/personnel"),
);

const AuthUserAppPage = lazy(() => import("src/pages/dashboard/auth/user"));

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: CONFIG.auth.skip ? (
      dashboardLayout()
    ) : (
      <AuthGuard>{dashboardLayout()}</AuthGuard>
    ),
    children: [
      { index: true, element: <IndexPage /> },

      {
        path: "guestManagement",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <GuestManagementGuestAppPage />,
          },

          {
            path: "guest",
            element: <GuestManagementGuestAppPage />,
          },
        ],
      },

      {
        path: "roomInventory",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <RoomInventoryRoomAppPage />,
          },

          {
            path: "room",
            element: <RoomInventoryRoomAppPage />,
          },
        ],
      },

      {
        path: "reservationManagement",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <ReservationManagementReservationAppPage />,
          },

          {
            path: "reservation",
            element: <ReservationManagementReservationAppPage />,
          },
        ],
      },

      {
        path: "packageManagement",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <PackageManagementPackage_AppPage />,
          },

          {
            path: "package_",
            element: <PackageManagementPackage_AppPage />,
          },
        ],
      },

      {
        path: "packageReservationMapping",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <PackageReservationMappingPackageReservationAppPage />,
          },

          {
            path: "packageReservation",
            element: <PackageReservationMappingPackageReservationAppPage />,
          },
        ],
      },

      {
        path: "specialRequestManagement",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <SpecialRequestManagementSpecialRequestAppPage />,
          },

          {
            path: "specialRequest",
            element: <SpecialRequestManagementSpecialRequestAppPage />,
          },
        ],
      },

      {
        path: "paymentManagement",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <PaymentManagementPaymentAppPage />,
          },

          {
            path: "payment",
            element: <PaymentManagementPaymentAppPage />,
          },
        ],
      },

      {
        path: "roomPricing",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <RoomPricingRoomPriceAppPage />,
          },

          {
            path: "roomPrice",
            element: <RoomPricingRoomPriceAppPage />,
          },
        ],
      },

      {
        path: "feedbackManagement",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <FeedbackManagementFeedbackAppPage />,
          },

          {
            path: "feedback",
            element: <FeedbackManagementFeedbackAppPage />,
          },
        ],
      },

      {
        path: "personnelManagement",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <PersonnelManagementPersonnelAppPage />,
          },

          {
            path: "personnel",
            element: <PersonnelManagementPersonnelAppPage />,
          },
        ],
      },

      {
        path: "auth",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <AuthUserAppPage />,
          },

          {
            path: "user",
            element: <AuthUserAppPage />,
          },
        ],
      },
    ],
  },
];
