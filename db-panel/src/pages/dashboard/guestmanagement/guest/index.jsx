import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useGuestManagementListGuests } from "src/actions/guestManagement";

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
  title: `Guest data - GuestManagement module - ${CONFIG.appName}`,
};

const GuestManagementUpdateGuestModal = lazy(
  () => import("src/components/modals/guestmanagement/guest/updateguest-modal"),
);

const GuestManagementDeleteGuestModal = lazy(
  () => import("src/components/modals/guestmanagement/guest/deleteguest-modal"),
);

export default function GuestManagementGuestAppPage() {
  const [selectedGuest, setSelectedGuest] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useGuestManagementListGuests();

  const OnEditClickHandler = (row) => {
    setSelectedGuest(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedGuest(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Guest");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listguests");

    setField("createModal", "GuestManagementCreateGuestModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/db/db-guestManagement-service.git",
    );

    setField("cruds", [
      {
        name: "CreateGuest",
        method: "CREATE",
        color: "success",
        componentName: "GuestManagementCreateGuestApiPage",
      },

      {
        name: "UpdateGuest",
        method: "UPDATE",
        color: "info",
        componentName: "GuestManagementUpdateGuestApiPage",
      },

      {
        name: "GetGuest",
        method: "GET",
        color: "primary",
        componentName: "GuestManagementGetGuestApiPage",
      },

      {
        name: "DeleteGuest",
        method: "DELETE",
        color: "error",
        componentName: "GuestManagementDeleteGuestApiPage",
      },

      {
        name: "ListGuests",
        method: "LIST",
        color: "primary",
        componentName: "GuestManagementListGuestsApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "fullname", headerName: "fullname", flex: 1 },

    { field: "email", headerName: "email", flex: 1 },

    { field: "phoneNumber", headerName: "phoneNumber", flex: 1 },

    { field: "address", headerName: "address", flex: 1 },

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

      <GuestManagementUpdateGuestModal
        openDialog={openEditDialog}
        selectedGuest={selectedGuest}
      />

      <GuestManagementDeleteGuestModal
        openDialog={openDeleteDialog}
        selectedId={selectedGuest?.id}
      />
    </>
  );
}
