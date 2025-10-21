import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { TableHeadCustom } from "../../../table/index.js";
import { Iconify } from "../../../iconify/index.js";
import { useTheme } from "@mui/material/styles";

import { Form, Field } from "../../../hook-form";
import * as zod from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

import roomInventoryAxios, {
  roomInventoryEndpoints,
} from "../../../../lib/roomInventory-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const RoomSchema = zod.object({
  roomNumber: zod.string().nullable(),

  floor: zod.number().nullable(),

  type: zod.string().nullable(),

  capacity: zod.number().nullable(),

  bedType: zod.string().nullable(),

  amenities: zod.string().nullable(),

  status: zod.string().nullable(),

  description: zod.string().nullable(),

  images: zod.string().nullable(),
});

export default function ({ openDialog, selectedRoom }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    {
      name: "roomNumber",
      value: selectedRoom?.roomNumber ?? "",
      type: "String",
    },

    { name: "floor", value: selectedRoom?.floor ?? "", type: "Integer" },

    { name: "type", value: selectedRoom?.type ?? "", type: "Enum" },

    { name: "capacity", value: selectedRoom?.capacity ?? "", type: "Integer" },

    { name: "bedType", value: selectedRoom?.bedType ?? "", type: "String" },

    { name: "amenities", value: selectedRoom?.amenities ?? "", type: "String" },

    { name: "status", value: selectedRoom?.status ?? "", type: "Enum" },

    {
      name: "description",
      value: selectedRoom?.description ?? "",
      type: "Text",
    },

    { name: "images", value: selectedRoom?.images ?? "", type: "String" },
  ];

  const defaultValues = {
    roomNumber: selectedRoom?.roomNumber ?? "",

    floor: selectedRoom?.floor ?? "",

    type: selectedRoom?.type ?? "",

    capacity: selectedRoom?.capacity ?? "",

    bedType: selectedRoom?.bedType ?? "",

    amenities: selectedRoom?.amenities ?? "",

    status: selectedRoom?.status ?? "",

    description: selectedRoom?.description ?? "",

    images: selectedRoom?.images ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(RoomSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (selectedRoom?.id) {
        const response = await roomInventoryAxios.patch(
          roomInventoryEndpoints.room.updateRoom.replace(
            ":roomId",
            selectedRoom?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([roomInventoryEndpoints.room.listRooms]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      roomNumber: selectedRoom?.roomNumber ?? "",

      floor: selectedRoom?.floor ?? "",

      type: selectedRoom?.type ?? "",

      capacity: selectedRoom?.capacity ?? "",

      bedType: selectedRoom?.bedType ?? "",

      amenities: selectedRoom?.amenities ?? "",

      status: selectedRoom?.status ?? "",

      description: selectedRoom?.description ?? "",

      images: selectedRoom?.images ?? "",
    });
  }, [selectedRoom]);

  if (!selectedRoom) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update Room</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }}>
              <TableHeadCustom headCells={UPDATE_TABLE_HEAD} />

              <TableBody>
                {requestParams.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell
                      sx={{ backgroundColor: theme.palette.grey[100] }}
                    >
                      <Chip variant="soft" label={row.name} />
                    </TableCell>
                    <TableCell>
                      {row.type === "Boolean" ? (
                        <Field.Checkbox name={row.name} />
                      ) : (
                        <Field.Text name={row.name} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {error && (
            <DialogContentText color="error">
              {error.message
                ? error.message
                : "An error occurred while creating the room."}
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions className="gap-2">
          <Link
            component="button"
            type="button"
            underline="always"
            onClick={openDialog.onFalse}
          >
            Cancel
          </Link>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            startIcon={<Iconify icon="material-symbols:save-outline" />}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
