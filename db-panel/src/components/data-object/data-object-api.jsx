import { lazy } from "react";

import { useDataObjectContext } from "../nav-section/data/context/index.js";

const GuestManagementCreateGuestApiPage = lazy(
  () => import("src/pages/dashboard/guestmanagement/guest/createGuest-api"),
);

const GuestManagementUpdateGuestApiPage = lazy(
  () => import("src/pages/dashboard/guestmanagement/guest/updateGuest-api"),
);

const GuestManagementGetGuestApiPage = lazy(
  () => import("src/pages/dashboard/guestmanagement/guest/getGuest-api"),
);

const GuestManagementDeleteGuestApiPage = lazy(
  () => import("src/pages/dashboard/guestmanagement/guest/deleteGuest-api"),
);

const GuestManagementListGuestsApiPage = lazy(
  () => import("src/pages/dashboard/guestmanagement/guest/listGuests-api"),
);

const RoomInventoryUpdateRoomApiPage = lazy(
  () => import("src/pages/dashboard/roominventory/room/updateRoom-api"),
);

const RoomInventoryGetRoomApiPage = lazy(
  () => import("src/pages/dashboard/roominventory/room/getRoom-api"),
);

const RoomInventoryDeleteRoomApiPage = lazy(
  () => import("src/pages/dashboard/roominventory/room/deleteRoom-api"),
);

const RoomInventoryListRoomsApiPage = lazy(
  () => import("src/pages/dashboard/roominventory/room/listRooms-api"),
);

const RoomInventoryListAvailableRoomsApiPage = lazy(
  () => import("src/pages/dashboard/roominventory/room/listAvailableRooms-api"),
);

const ReservationManagementCreateReservationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reservationmanagement/reservation/createReservation-api"
    ),
);

const ReservationManagementUpdateReservationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reservationmanagement/reservation/updateReservation-api"
    ),
);

const ReservationManagementGetReservationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reservationmanagement/reservation/getReservation-api"
    ),
);

const ReservationManagementDeleteReservationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reservationmanagement/reservation/deleteReservation-api"
    ),
);

const ReservationManagementListReservationsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reservationmanagement/reservation/listReservations-api"
    ),
);

const ReservationManagementCreateReservationGuestApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reservationmanagement/reservation/createReservationGuest-api"
    ),
);

const ReservationManagementConfirmReservationPaymentApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reservationmanagement/reservation/confirmReservationPayment-api"
    ),
);

const ReservationManagementGetReservationByCodeApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reservationmanagement/reservation/getReservationByCode-api"
    ),
);

const ReservationManagementUpdateReservationByCodeApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reservationmanagement/reservation/updateReservationByCode-api"
    ),
);

const ReservationManagementCancelReservationByCodeApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/reservationmanagement/reservation/cancelReservationByCode-api"
    ),
);

const PackageManagementCreatePackageApiPage = lazy(
  () =>
    import("src/pages/dashboard/packagemanagement/package_/createPackage-api"),
);

const PackageManagementUpdatePackageApiPage = lazy(
  () =>
    import("src/pages/dashboard/packagemanagement/package_/updatePackage-api"),
);

const PackageManagementGetPackageApiPage = lazy(
  () => import("src/pages/dashboard/packagemanagement/package_/getPackage-api"),
);

const PackageManagementDeletePackageApiPage = lazy(
  () =>
    import("src/pages/dashboard/packagemanagement/package_/deletePackage-api"),
);

const PackageManagementListPackagesApiPage = lazy(
  () =>
    import("src/pages/dashboard/packagemanagement/package_/listPackages-api"),
);

const PackageReservationMappingCreatePackageReservationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/packagereservationmapping/packagereservation/createPackageReservation-api"
    ),
);

const PackageReservationMappingUpdatePackageReservationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/packagereservationmapping/packagereservation/updatePackageReservation-api"
    ),
);

const PackageReservationMappingDeletePackageReservationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/packagereservationmapping/packagereservation/deletePackageReservation-api"
    ),
);

const PackageReservationMappingGetPackageReservationApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/packagereservationmapping/packagereservation/getPackageReservation-api"
    ),
);

const PackageReservationMappingListPackageReservationsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/packagereservationmapping/packagereservation/listPackageReservations-api"
    ),
);

const SpecialRequestManagementCreateSpecialRequestApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/specialrequestmanagement/specialrequest/createSpecialRequest-api"
    ),
);

const SpecialRequestManagementUpdateSpecialRequestApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/specialrequestmanagement/specialrequest/updateSpecialRequest-api"
    ),
);

const SpecialRequestManagementGetSpecialRequestApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/specialrequestmanagement/specialrequest/getSpecialRequest-api"
    ),
);

const SpecialRequestManagementDeleteSpecialRequestApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/specialrequestmanagement/specialrequest/deleteSpecialRequest-api"
    ),
);

const SpecialRequestManagementListSpecialRequestsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/specialrequestmanagement/specialrequest/listSpecialRequests-api"
    ),
);

const SpecialRequestManagementCreateSpecialRequestPublicApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/specialrequestmanagement/specialrequest/createSpecialRequestPublic-api"
    ),
);

const SpecialRequestManagementListSpecialRequestsByCodeApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/specialrequestmanagement/specialrequest/listSpecialRequestsByCode-api"
    ),
);

const SpecialRequestManagementGetSpecialRequestByCodeApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/specialrequestmanagement/specialrequest/getSpecialRequestByCode-api"
    ),
);

const SpecialRequestManagementCancelSpecialRequestByCodeApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/specialrequestmanagement/specialrequest/cancelSpecialRequestByCode-api"
    ),
);

const PaymentManagementCreatePaymentApiPage = lazy(
  () =>
    import("src/pages/dashboard/paymentmanagement/payment/createPayment-api"),
);

const PaymentManagementUpdatePaymentApiPage = lazy(
  () =>
    import("src/pages/dashboard/paymentmanagement/payment/updatePayment-api"),
);

const PaymentManagementDeletePaymentApiPage = lazy(
  () =>
    import("src/pages/dashboard/paymentmanagement/payment/deletePayment-api"),
);

const PaymentManagementGetPaymentApiPage = lazy(
  () => import("src/pages/dashboard/paymentmanagement/payment/getPayment-api"),
);

const PaymentManagementListPaymentsApiPage = lazy(
  () =>
    import("src/pages/dashboard/paymentmanagement/payment/listPayments-api"),
);

const RoomPricingCreateRoomPriceApiPage = lazy(
  () => import("src/pages/dashboard/roompricing/roomprice/createRoomPrice-api"),
);

const RoomPricingUpdateRoomPriceApiPage = lazy(
  () => import("src/pages/dashboard/roompricing/roomprice/updateRoomPrice-api"),
);

const RoomPricingDeleteRoomPriceApiPage = lazy(
  () => import("src/pages/dashboard/roompricing/roomprice/deleteRoomPrice-api"),
);

const RoomPricingGetRoomPriceApiPage = lazy(
  () => import("src/pages/dashboard/roompricing/roomprice/getRoomPrice-api"),
);

const RoomPricingListRoomPricesApiPage = lazy(
  () => import("src/pages/dashboard/roompricing/roomprice/listRoomPrices-api"),
);

const FeedbackManagementCreateFeedbackGuestApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/feedbackmanagement/feedback/createFeedbackGuest-api"
    ),
);

const FeedbackManagementGetFeedbackApiPage = lazy(
  () =>
    import("src/pages/dashboard/feedbackmanagement/feedback/getFeedback-api"),
);

const FeedbackManagementUpdateFeedbackApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/feedbackmanagement/feedback/updateFeedback-api"
    ),
);

const FeedbackManagementDeleteFeedbackApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/feedbackmanagement/feedback/deleteFeedback-api"
    ),
);

const FeedbackManagementListFeedbacksApiPage = lazy(
  () =>
    import("src/pages/dashboard/feedbackmanagement/feedback/listFeedbacks-api"),
);

const PersonnelManagementCreatePersonnelApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/personnelmanagement/personnel/createPersonnel-api"
    ),
);

const PersonnelManagementUpdatePersonnelApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/personnelmanagement/personnel/updatePersonnel-api"
    ),
);

const PersonnelManagementDeletePersonnelApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/personnelmanagement/personnel/deletePersonnel-api"
    ),
);

const PersonnelManagementGetPersonnelApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/personnelmanagement/personnel/getPersonnel-api"
    ),
);

const PersonnelManagementListPersonnelsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/personnelmanagement/personnel/listPersonnels-api"
    ),
);

const AuthGetUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/getUser-api"),
);

const AuthUpdateUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updateUser-api"),
);

const AuthRegisterUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/registerUser-api"),
);

const AuthDeleteUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/deleteUser-api"),
);

const AuthListUsersApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/listUsers-api"),
);

const AuthUpdateUserRoleApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updateUserRole-api"),
);

const AuthUpdateUserPasswordApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updateUserPassword-api"),
);

const AuthGetBriefUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/getBriefUser-api"),
);

const APIComponents = {
  GuestManagementCreateGuestApiPage: <GuestManagementCreateGuestApiPage />,

  GuestManagementUpdateGuestApiPage: <GuestManagementUpdateGuestApiPage />,

  GuestManagementGetGuestApiPage: <GuestManagementGetGuestApiPage />,

  GuestManagementDeleteGuestApiPage: <GuestManagementDeleteGuestApiPage />,

  GuestManagementListGuestsApiPage: <GuestManagementListGuestsApiPage />,

  RoomInventoryUpdateRoomApiPage: <RoomInventoryUpdateRoomApiPage />,

  RoomInventoryGetRoomApiPage: <RoomInventoryGetRoomApiPage />,

  RoomInventoryDeleteRoomApiPage: <RoomInventoryDeleteRoomApiPage />,

  RoomInventoryListRoomsApiPage: <RoomInventoryListRoomsApiPage />,

  RoomInventoryListAvailableRoomsApiPage: (
    <RoomInventoryListAvailableRoomsApiPage />
  ),

  ReservationManagementCreateReservationApiPage: (
    <ReservationManagementCreateReservationApiPage />
  ),

  ReservationManagementUpdateReservationApiPage: (
    <ReservationManagementUpdateReservationApiPage />
  ),

  ReservationManagementGetReservationApiPage: (
    <ReservationManagementGetReservationApiPage />
  ),

  ReservationManagementDeleteReservationApiPage: (
    <ReservationManagementDeleteReservationApiPage />
  ),

  ReservationManagementListReservationsApiPage: (
    <ReservationManagementListReservationsApiPage />
  ),

  ReservationManagementCreateReservationGuestApiPage: (
    <ReservationManagementCreateReservationGuestApiPage />
  ),

  ReservationManagementConfirmReservationPaymentApiPage: (
    <ReservationManagementConfirmReservationPaymentApiPage />
  ),

  ReservationManagementGetReservationByCodeApiPage: (
    <ReservationManagementGetReservationByCodeApiPage />
  ),

  ReservationManagementUpdateReservationByCodeApiPage: (
    <ReservationManagementUpdateReservationByCodeApiPage />
  ),

  ReservationManagementCancelReservationByCodeApiPage: (
    <ReservationManagementCancelReservationByCodeApiPage />
  ),

  PackageManagementCreatePackageApiPage: (
    <PackageManagementCreatePackageApiPage />
  ),

  PackageManagementUpdatePackageApiPage: (
    <PackageManagementUpdatePackageApiPage />
  ),

  PackageManagementGetPackageApiPage: <PackageManagementGetPackageApiPage />,

  PackageManagementDeletePackageApiPage: (
    <PackageManagementDeletePackageApiPage />
  ),

  PackageManagementListPackagesApiPage: (
    <PackageManagementListPackagesApiPage />
  ),

  PackageReservationMappingCreatePackageReservationApiPage: (
    <PackageReservationMappingCreatePackageReservationApiPage />
  ),

  PackageReservationMappingUpdatePackageReservationApiPage: (
    <PackageReservationMappingUpdatePackageReservationApiPage />
  ),

  PackageReservationMappingDeletePackageReservationApiPage: (
    <PackageReservationMappingDeletePackageReservationApiPage />
  ),

  PackageReservationMappingGetPackageReservationApiPage: (
    <PackageReservationMappingGetPackageReservationApiPage />
  ),

  PackageReservationMappingListPackageReservationsApiPage: (
    <PackageReservationMappingListPackageReservationsApiPage />
  ),

  SpecialRequestManagementCreateSpecialRequestApiPage: (
    <SpecialRequestManagementCreateSpecialRequestApiPage />
  ),

  SpecialRequestManagementUpdateSpecialRequestApiPage: (
    <SpecialRequestManagementUpdateSpecialRequestApiPage />
  ),

  SpecialRequestManagementGetSpecialRequestApiPage: (
    <SpecialRequestManagementGetSpecialRequestApiPage />
  ),

  SpecialRequestManagementDeleteSpecialRequestApiPage: (
    <SpecialRequestManagementDeleteSpecialRequestApiPage />
  ),

  SpecialRequestManagementListSpecialRequestsApiPage: (
    <SpecialRequestManagementListSpecialRequestsApiPage />
  ),

  SpecialRequestManagementCreateSpecialRequestPublicApiPage: (
    <SpecialRequestManagementCreateSpecialRequestPublicApiPage />
  ),

  SpecialRequestManagementListSpecialRequestsByCodeApiPage: (
    <SpecialRequestManagementListSpecialRequestsByCodeApiPage />
  ),

  SpecialRequestManagementGetSpecialRequestByCodeApiPage: (
    <SpecialRequestManagementGetSpecialRequestByCodeApiPage />
  ),

  SpecialRequestManagementCancelSpecialRequestByCodeApiPage: (
    <SpecialRequestManagementCancelSpecialRequestByCodeApiPage />
  ),

  PaymentManagementCreatePaymentApiPage: (
    <PaymentManagementCreatePaymentApiPage />
  ),

  PaymentManagementUpdatePaymentApiPage: (
    <PaymentManagementUpdatePaymentApiPage />
  ),

  PaymentManagementDeletePaymentApiPage: (
    <PaymentManagementDeletePaymentApiPage />
  ),

  PaymentManagementGetPaymentApiPage: <PaymentManagementGetPaymentApiPage />,

  PaymentManagementListPaymentsApiPage: (
    <PaymentManagementListPaymentsApiPage />
  ),

  RoomPricingCreateRoomPriceApiPage: <RoomPricingCreateRoomPriceApiPage />,

  RoomPricingUpdateRoomPriceApiPage: <RoomPricingUpdateRoomPriceApiPage />,

  RoomPricingDeleteRoomPriceApiPage: <RoomPricingDeleteRoomPriceApiPage />,

  RoomPricingGetRoomPriceApiPage: <RoomPricingGetRoomPriceApiPage />,

  RoomPricingListRoomPricesApiPage: <RoomPricingListRoomPricesApiPage />,

  FeedbackManagementCreateFeedbackGuestApiPage: (
    <FeedbackManagementCreateFeedbackGuestApiPage />
  ),

  FeedbackManagementGetFeedbackApiPage: (
    <FeedbackManagementGetFeedbackApiPage />
  ),

  FeedbackManagementUpdateFeedbackApiPage: (
    <FeedbackManagementUpdateFeedbackApiPage />
  ),

  FeedbackManagementDeleteFeedbackApiPage: (
    <FeedbackManagementDeleteFeedbackApiPage />
  ),

  FeedbackManagementListFeedbacksApiPage: (
    <FeedbackManagementListFeedbacksApiPage />
  ),

  PersonnelManagementCreatePersonnelApiPage: (
    <PersonnelManagementCreatePersonnelApiPage />
  ),

  PersonnelManagementUpdatePersonnelApiPage: (
    <PersonnelManagementUpdatePersonnelApiPage />
  ),

  PersonnelManagementDeletePersonnelApiPage: (
    <PersonnelManagementDeletePersonnelApiPage />
  ),

  PersonnelManagementGetPersonnelApiPage: (
    <PersonnelManagementGetPersonnelApiPage />
  ),

  PersonnelManagementListPersonnelsApiPage: (
    <PersonnelManagementListPersonnelsApiPage />
  ),

  AuthGetUserApiPage: <AuthGetUserApiPage />,

  AuthUpdateUserApiPage: <AuthUpdateUserApiPage />,

  AuthRegisterUserApiPage: <AuthRegisterUserApiPage />,

  AuthDeleteUserApiPage: <AuthDeleteUserApiPage />,

  AuthListUsersApiPage: <AuthListUsersApiPage />,

  AuthUpdateUserRoleApiPage: <AuthUpdateUserRoleApiPage />,

  AuthUpdateUserPasswordApiPage: <AuthUpdateUserPasswordApiPage />,

  AuthGetBriefUserApiPage: <AuthGetBriefUserApiPage />,
};

export function DataObjectApi() {
  const { state } = useDataObjectContext();

  if (!state.selectedApi) return <h2>{state.name} API</h2>;

  return <>{state.selectedApi && APIComponents[state.selectedApi]}</>;
}
