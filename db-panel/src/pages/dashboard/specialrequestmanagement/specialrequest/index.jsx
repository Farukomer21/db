import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useSpecialRequestManagementListSpecialRequests } from "src/actions/specialRequestManagement";

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
  title: `SpecialRequest data - SpecialRequestManagement module - ${CONFIG.appName}`,
};

const SpecialRequestManagementUpdateSpecialRequestModal = lazy(
  () =>
    import(
      "src/components/modals/specialrequestmanagement/specialrequest/updatespecialrequest-modal"
    ),
);

const SpecialRequestManagementDeleteSpecialRequestModal = lazy(
  () =>
    import(
      "src/components/modals/specialrequestmanagement/specialrequest/deletespecialrequest-modal"
    ),
);

export default function SpecialRequestManagementSpecialRequestAppPage() {
  const [selectedSpecialRequest, setSelectedSpecialRequest] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useSpecialRequestManagementListSpecialRequests();

  const OnEditClickHandler = (row) => {
    setSelectedSpecialRequest(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedSpecialRequest(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "SpecialRequest");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listspecialRequests");

    setField(
      "createModal",
      "SpecialRequestManagementCreateSpecialRequestModal",
    );

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/db/db-specialRequestManagement-service.git",
    );

    setField("cruds", [
      {
        name: "CreateSpecialRequest",
        method: "CREATE",
        color: "success",
        componentName: "SpecialRequestManagementCreateSpecialRequestApiPage",
      },

      {
        name: "UpdateSpecialRequest",
        method: "UPDATE",
        color: "info",
        componentName: "SpecialRequestManagementUpdateSpecialRequestApiPage",
      },

      {
        name: "GetSpecialRequest",
        method: "GET",
        color: "primary",
        componentName: "SpecialRequestManagementGetSpecialRequestApiPage",
      },

      {
        name: "DeleteSpecialRequest",
        method: "DELETE",
        color: "error",
        componentName: "SpecialRequestManagementDeleteSpecialRequestApiPage",
      },

      {
        name: "ListSpecialRequests",
        method: "LIST",
        color: "primary",
        componentName: "SpecialRequestManagementListSpecialRequestsApiPage",
      },

      {
        name: "CreateSpecialRequestPublic",
        method: "CREATE",
        color: "success",
        componentName:
          "SpecialRequestManagementCreateSpecialRequestPublicApiPage",
      },

      {
        name: "ListSpecialRequestsByCode",
        method: "LIST",
        color: "primary",
        componentName:
          "SpecialRequestManagementListSpecialRequestsByCodeApiPage",
      },

      {
        name: "GetSpecialRequestByCode",
        method: "GET",
        color: "primary",
        componentName: "SpecialRequestManagementGetSpecialRequestByCodeApiPage",
      },

      {
        name: "CancelSpecialRequestByCode",
        method: "UPDATE",
        color: "info",
        componentName:
          "SpecialRequestManagementCancelSpecialRequestByCodeApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "reservationId", headerName: "reservationId", flex: 1 },

    { field: "guestId", headerName: "guestId", flex: 1 },

    { field: "requestText", headerName: "requestText", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "response", headerName: "response", flex: 1 },
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

      <SpecialRequestManagementUpdateSpecialRequestModal
        openDialog={openEditDialog}
        selectedSpecialRequest={selectedSpecialRequest}
      />

      <SpecialRequestManagementDeleteSpecialRequestModal
        openDialog={openDeleteDialog}
        selectedId={selectedSpecialRequest?.id}
      />
    </>
  );
}
