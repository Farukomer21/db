import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { useRoomInventoryListRooms } from "src/actions/roomInventory";

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
  title: `Room data - RoomInventory module - ${CONFIG.appName}`,
};

const RoomInventoryUpdateRoomModal = lazy(
  () => import("src/components/modals/roominventory/room/updateroom-modal"),
);

const RoomInventoryDeleteRoomModal = lazy(
  () => import("src/components/modals/roominventory/room/deleteroom-modal"),
);

export default function RoomInventoryRoomAppPage() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    useRoomInventoryListRooms();

  const OnEditClickHandler = (row) => {
    setSelectedRoom(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedRoom(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Room");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listrooms");

    setField("createModal", null);

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/db/db-roomInventory-service.git",
    );

    setField("cruds", [
      {
        name: "UpdateRoom",
        method: "UPDATE",
        color: "info",
        componentName: "RoomInventoryUpdateRoomApiPage",
      },

      {
        name: "GetRoom",
        method: "GET",
        color: "primary",
        componentName: "RoomInventoryGetRoomApiPage",
      },

      {
        name: "DeleteRoom",
        method: "DELETE",
        color: "error",
        componentName: "RoomInventoryDeleteRoomApiPage",
      },

      {
        name: "ListRooms",
        method: "LIST",
        color: "primary",
        componentName: "RoomInventoryListRoomsApiPage",
      },

      {
        name: "ListAvailableRooms",
        method: "LIST",
        color: "primary",
        componentName: "RoomInventoryListAvailableRoomsApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "roomNumber", headerName: "roomNumber", flex: 1 },

    { field: "floor", headerName: "floor", flex: 1 },

    { field: "type", headerName: "type", flex: 1 },

    { field: "capacity", headerName: "capacity", flex: 1 },

    { field: "bedType", headerName: "bedType", flex: 1 },

    { field: "amenities", headerName: "amenities", flex: 1 },

    { field: "status", headerName: "status", flex: 1 },

    { field: "description", headerName: "description", flex: 1 },

    { field: "images", headerName: "images", flex: 1 },
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

      <RoomInventoryUpdateRoomModal
        openDialog={openEditDialog}
        selectedRoom={selectedRoom}
      />

      <RoomInventoryDeleteRoomModal
        openDialog={openDeleteDialog}
        selectedId={selectedRoom?.id}
      />
    </>
  );
}
