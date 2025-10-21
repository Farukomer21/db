import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { usePersonnelManagementListPersonnels } from "src/actions/personnelManagement";

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
  title: `Personnel data - PersonnelManagement module - ${CONFIG.appName}`,
};

const PersonnelManagementUpdatePersonnelModal = lazy(
  () =>
    import(
      "src/components/modals/personnelmanagement/personnel/updatepersonnel-modal"
    ),
);

const PersonnelManagementDeletePersonnelModal = lazy(
  () =>
    import(
      "src/components/modals/personnelmanagement/personnel/deletepersonnel-modal"
    ),
);

export default function PersonnelManagementPersonnelAppPage() {
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    usePersonnelManagementListPersonnels();

  const OnEditClickHandler = (row) => {
    setSelectedPersonnel(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedPersonnel(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Personnel");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listpersonnels");

    setField("createModal", "PersonnelManagementCreatePersonnelModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/db/db-personnelManagement-service.git",
    );

    setField("cruds", [
      {
        name: "CreatePersonnel",
        method: "CREATE",
        color: "success",
        componentName: "PersonnelManagementCreatePersonnelApiPage",
      },

      {
        name: "UpdatePersonnel",
        method: "UPDATE",
        color: "info",
        componentName: "PersonnelManagementUpdatePersonnelApiPage",
      },

      {
        name: "DeletePersonnel",
        method: "DELETE",
        color: "error",
        componentName: "PersonnelManagementDeletePersonnelApiPage",
      },

      {
        name: "GetPersonnel",
        method: "GET",
        color: "primary",
        componentName: "PersonnelManagementGetPersonnelApiPage",
      },

      {
        name: "ListPersonnels",
        method: "LIST",
        color: "primary",
        componentName: "PersonnelManagementListPersonnelsApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "name", headerName: "name", flex: 1 },

    { field: "jobTitle", headerName: "jobTitle", flex: 1 },

    { field: "department", headerName: "department", flex: 1 },

    { field: "startDate", headerName: "startDate", flex: 1 },

    { field: "endDate", headerName: "endDate", flex: 1 },

    { field: "contactInfo", headerName: "contactInfo", flex: 1 },

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

      <PersonnelManagementUpdatePersonnelModal
        openDialog={openEditDialog}
        selectedPersonnel={selectedPersonnel}
      />

      <PersonnelManagementDeletePersonnelModal
        openDialog={openDeleteDialog}
        selectedId={selectedPersonnel?.id}
      />
    </>
  );
}
