import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useFeedbackManagementListFeedbacks } from "src/actions/feedbackManagement";

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
  title: `Feedback data - FeedbackManagement module - ${CONFIG.appName}`,
};

const FeedbackManagementUpdateFeedbackModal = lazy(
  () =>
    import(
      "src/components/modals/feedbackmanagement/feedback/updatefeedback-modal"
    ),
);

const FeedbackManagementDeleteFeedbackModal = lazy(
  () =>
    import(
      "src/components/modals/feedbackmanagement/feedback/deletefeedback-modal"
    ),
);

export default function FeedbackManagementFeedbackAppPage() {
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useFeedbackManagementListFeedbacks();

  const OnEditClickHandler = (row) => {
    setSelectedFeedback(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedFeedback(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Feedback");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listfeedbacks");

    setField("createModal", "FeedbackManagementCreateFeedbackGuestModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/db/db-feedbackManagement-service.git",
    );

    setField("cruds", [
      {
        name: "CreateFeedbackGuest",
        method: "CREATE",
        color: "success",
        componentName: "FeedbackManagementCreateFeedbackGuestApiPage",
      },

      {
        name: "GetFeedback",
        method: "GET",
        color: "primary",
        componentName: "FeedbackManagementGetFeedbackApiPage",
      },

      {
        name: "UpdateFeedback",
        method: "UPDATE",
        color: "info",
        componentName: "FeedbackManagementUpdateFeedbackApiPage",
      },

      {
        name: "DeleteFeedback",
        method: "DELETE",
        color: "error",
        componentName: "FeedbackManagementDeleteFeedbackApiPage",
      },

      {
        name: "ListFeedbacks",
        method: "LIST",
        color: "primary",
        componentName: "FeedbackManagementListFeedbacksApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "reservationId", headerName: "reservationId", flex: 1 },

    { field: "guestName", headerName: "guestName", flex: 1 },

    { field: "rating", headerName: "rating", flex: 1 },

    { field: "comment", headerName: "comment", flex: 1 },

    { field: "submittedAt", headerName: "submittedAt", flex: 1 },
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

      <FeedbackManagementUpdateFeedbackModal
        openDialog={openEditDialog}
        selectedFeedback={selectedFeedback}
      />

      <FeedbackManagementDeleteFeedbackModal
        openDialog={openDeleteDialog}
        selectedId={selectedFeedback?.id}
      />
    </>
  );
}
