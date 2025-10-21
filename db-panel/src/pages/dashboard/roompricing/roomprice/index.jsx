import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useRoomPricingListRoomPrices } from "src/actions/roomPricing";

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
  title: `RoomPrice data - RoomPricing module - ${CONFIG.appName}`,
};

const RoomPricingUpdateRoomPriceModal = lazy(
  () =>
    import("src/components/modals/roompricing/roomprice/updateroomprice-modal"),
);

const RoomPricingDeleteRoomPriceModal = lazy(
  () =>
    import("src/components/modals/roompricing/roomprice/deleteroomprice-modal"),
);

export default function RoomPricingRoomPriceAppPage() {
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useRoomPricingListRoomPrices();

  const OnEditClickHandler = (row) => {
    setSelectedRoomPrice(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedRoomPrice(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "RoomPrice");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listroomPrices");

    setField("createModal", "RoomPricingCreateRoomPriceModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/db/db-roomPricing-service.git",
    );

    setField("cruds", [
      {
        name: "CreateRoomPrice",
        method: "CREATE",
        color: "success",
        componentName: "RoomPricingCreateRoomPriceApiPage",
      },

      {
        name: "UpdateRoomPrice",
        method: "UPDATE",
        color: "info",
        componentName: "RoomPricingUpdateRoomPriceApiPage",
      },

      {
        name: "DeleteRoomPrice",
        method: "DELETE",
        color: "error",
        componentName: "RoomPricingDeleteRoomPriceApiPage",
      },

      {
        name: "GetRoomPrice",
        method: "GET",
        color: "primary",
        componentName: "RoomPricingGetRoomPriceApiPage",
      },

      {
        name: "ListRoomPrices",
        method: "LIST",
        color: "primary",
        componentName: "RoomPricingListRoomPricesApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "roomId", headerName: "roomId", flex: 1 },

    { field: "startDate", headerName: "startDate", flex: 1 },

    { field: "endDate", headerName: "endDate", flex: 1 },

    { field: "price", headerName: "price", flex: 1 },

    { field: "priceType", headerName: "priceType", flex: 1 },

    { field: "description", headerName: "description", flex: 1 },
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

      <RoomPricingUpdateRoomPriceModal
        openDialog={openEditDialog}
        selectedRoomPrice={selectedRoomPrice}
      />

      <RoomPricingDeleteRoomPriceModal
        openDialog={openDeleteDialog}
        selectedId={selectedRoomPrice?.id}
      />
    </>
  );
}
