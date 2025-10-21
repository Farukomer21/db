import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { usePackageManagementListPackages } from "src/actions/packageManagement";

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
  title: `Package_ data - PackageManagement module - ${CONFIG.appName}`,
};

const PackageManagementUpdatePackageModal = lazy(
  () =>
    import(
      "src/components/modals/packagemanagement/package_/updatepackage-modal"
    ),
);

const PackageManagementDeletePackageModal = lazy(
  () =>
    import(
      "src/components/modals/packagemanagement/package_/deletepackage-modal"
    ),
);

export default function PackageManagementPackage_AppPage() {
  const [selectedPackage_, setSelectedPackage_] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    usePackageManagementListPackages();

  const OnEditClickHandler = (row) => {
    setSelectedPackage_(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedPackage_(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Package_");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listpackage_s");

    setField("createModal", "PackageManagementCreatePackageModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/db/db-packageManagement-service.git",
    );

    setField("cruds", [
      {
        name: "CreatePackage",
        method: "CREATE",
        color: "success",
        componentName: "PackageManagementCreatePackageApiPage",
      },

      {
        name: "UpdatePackage",
        method: "UPDATE",
        color: "info",
        componentName: "PackageManagementUpdatePackageApiPage",
      },

      {
        name: "GetPackage",
        method: "GET",
        color: "primary",
        componentName: "PackageManagementGetPackageApiPage",
      },

      {
        name: "DeletePackage",
        method: "DELETE",
        color: "error",
        componentName: "PackageManagementDeletePackageApiPage",
      },

      {
        name: "ListPackages",
        method: "LIST",
        color: "primary",
        componentName: "PackageManagementListPackagesApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "name", headerName: "name", flex: 1 },

    { field: "description", headerName: "description", flex: 1 },

    { field: "price", headerName: "price", flex: 1 },

    { field: "duration", headerName: "duration", flex: 1 },

    { field: "conditions", headerName: "conditions", flex: 1 },
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

      <PackageManagementUpdatePackageModal
        openDialog={openEditDialog}
        selectedPackage_={selectedPackage_}
      />

      <PackageManagementDeletePackageModal
        openDialog={openDeleteDialog}
        selectedId={selectedPackage_?.id}
      />
    </>
  );
}
