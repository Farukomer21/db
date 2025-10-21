import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { usePackageReservationMappingListPackageReservations } from "src/actions/packageReservationMapping";

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
  title: `PackageReservation data - PackageReservationMapping module - ${CONFIG.appName}`,
};

const PackageReservationMappingUpdatePackageReservationModal = lazy(
  () =>
    import(
      "src/components/modals/packagereservationmapping/packagereservation/updatepackagereservation-modal"
    ),
);

const PackageReservationMappingDeletePackageReservationModal = lazy(
  () =>
    import(
      "src/components/modals/packagereservationmapping/packagereservation/deletepackagereservation-modal"
    ),
);

export default function PackageReservationMappingPackageReservationAppPage() {
  const [selectedPackageReservation, setSelectedPackageReservation] =
    useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    usePackageReservationMappingListPackageReservations();

  const OnEditClickHandler = (row) => {
    setSelectedPackageReservation(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedPackageReservation(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "PackageReservation");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listpackageReservations");

    setField(
      "createModal",
      "PackageReservationMappingCreatePackageReservationModal",
    );

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/db/db-packageReservationMapping-service.git",
    );

    setField("cruds", [
      {
        name: "CreatePackageReservation",
        method: "CREATE",
        color: "success",
        componentName:
          "PackageReservationMappingCreatePackageReservationApiPage",
      },

      {
        name: "UpdatePackageReservation",
        method: "UPDATE",
        color: "info",
        componentName:
          "PackageReservationMappingUpdatePackageReservationApiPage",
      },

      {
        name: "DeletePackageReservation",
        method: "DELETE",
        color: "error",
        componentName:
          "PackageReservationMappingDeletePackageReservationApiPage",
      },

      {
        name: "GetPackageReservation",
        method: "GET",
        color: "primary",
        componentName: "PackageReservationMappingGetPackageReservationApiPage",
      },

      {
        name: "ListPackageReservations",
        method: "LIST",
        color: "primary",
        componentName:
          "PackageReservationMappingListPackageReservationsApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "reservationId", headerName: "reservationId", flex: 1 },

    { field: "packageId", headerName: "packageId", flex: 1 },

    { field: "priceAtBooking", headerName: "priceAtBooking", flex: 1 },

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

      <PackageReservationMappingUpdatePackageReservationModal
        openDialog={openEditDialog}
        selectedPackageReservation={selectedPackageReservation}
      />

      <PackageReservationMappingDeletePackageReservationModal
        openDialog={openDeleteDialog}
        selectedId={selectedPackageReservation?.id}
      />
    </>
  );
}
