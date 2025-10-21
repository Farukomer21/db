import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useReservationManagementListReservations } from "src/actions/reservationManagement";

import { Iconify } from "src/components/iconify";

import { DashboardContent } from "../../../../layouts/dashboard/index.js";
import { useDataObjectContext } from "../../../../components/nav-section/data/context";
import {
  DataObjectApi,
  DataObjectList,
} from "../../../../components/data-object/index.js";
import { useBoolean } from "minimal-shared/hooks";

// ----------------------------------------------------------------------
// TODO: Add the feature to tell the user what crud route need to be created to use add,update and delete

const metadata = {
  title: `Reservation data - ReservationManagement module - ${CONFIG.appName}`,
};

const ReservationManagementUpdateReservationModal = lazy(
  () =>
    import(
      "src/components/modals/reservationmanagement/reservation/updatereservation-modal"
    ),
);

const ReservationManagementDeleteReservationModal = lazy(
  () =>
    import(
      "src/components/modals/reservationmanagement/reservation/deletereservation-modal"
    ),
);

export default function ReservationManagementReservationAppPage() {
  const [selectedReservation, setSelectedReservation] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useReservationManagementListReservations();

  const OnEditClickHandler = (row) => {
    setSelectedReservation(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedReservation(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Reservation");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listreservations");

    setField("createModal", "ReservationManagementCreateReservationModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/db/db-reservationManagement-service.git",
    );

    setField("cruds", [
      {
        name: "CreateReservation",
        method: "CREATE",
        color: "success",
        componentName: "ReservationManagementCreateReservationApiPage",
      },

      {
        name: "UpdateReservation",
        method: "UPDATE",
        color: "info",
        componentName: "ReservationManagementUpdateReservationApiPage",
      },

      {
        name: "GetReservation",
        method: "GET",
        color: "primary",
        componentName: "ReservationManagementGetReservationApiPage",
      },

      {
        name: "DeleteReservation",
        method: "DELETE",
        color: "error",
        componentName: "ReservationManagementDeleteReservationApiPage",
      },

      {
        name: "ListReservations",
        method: "LIST",
        color: "primary",
        componentName: "ReservationManagementListReservationsApiPage",
      },

      {
        name: "CreateReservationGuest",
        method: "CREATE",
        color: "success",
        componentName: "ReservationManagementCreateReservationGuestApiPage",
      },

      {
        name: "ConfirmReservationPayment",
        method: "UPDATE",
        color: "info",
        componentName: "ReservationManagementConfirmReservationPaymentApiPage",
      },

      {
        name: "GetReservationByCode",
        method: "GET",
        color: "primary",
        componentName: "ReservationManagementGetReservationByCodeApiPage",
      },

      {
        name: "UpdateReservationByCode",
        method: "UPDATE",
        color: "info",
        componentName: "ReservationManagementUpdateReservationByCodeApiPage",
      },

      {
        name: "CancelReservationByCode",
        method: "UPDATE",
        color: "info",
        componentName: "ReservationManagementCancelReservationByCodeApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "guestId", headerName: "guestId", flex: 1 },

    { field: "roomId", headerName: "roomId", flex: 1 },

    { field: "checkInDate", headerName: "checkInDate", flex: 1 },

    { field: "checkOutDate", headerName: "checkOutDate", flex: 1 },

    { field: "reservationCode", headerName: "reservationCode", flex: 1 },

    { field: "packages", headerName: "packages", flex: 1 },

    { field: "specialRequests", headerName: "specialRequests", flex: 1 },

    { field: "paymentId", headerName: "paymentId", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "numGuests", headerName: "numGuests", flex: 1 },

    { field: "totalPrice", headerName: "totalPrice", flex: 1 },

    { field: "notes", headerName: "notes", flex: 1 },
    {
      type: "actions",
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Update"
          onClick={() => OnEditClickHandler(params.row)}
        />,

        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => OnDeleteClickHandler(params.row)}
          sx={{ color: "error.main" }}
        />,
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {state.display === "List" ? (
          <DataObjectList columns={columns} rows={options} />
        ) : (
          <DataObjectApi />
        )}
      </DashboardContent>

      <ReservationManagementUpdateReservationModal
        openDialog={openEditDialog}
        selectedReservation={selectedReservation}
      />

      <ReservationManagementDeleteReservationModal
        openDialog={openDeleteDialog}
        selectedId={selectedReservation?.id}
      />
    </>
  );
}
