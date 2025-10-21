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

import roomPricingAxios, {
  roomPricingEndpoints,
} from "../../../../lib/roomPricing-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const RoompriceSchema = zod.object({
  roomId: zod.string().nullable(),

  startDate: zod.string().nullable(),

  endDate: zod.string().nullable(),

  price: zod.number().nullable(),

  priceType: zod.string().nullable(),

  description: zod.string().nullable(),
});

export default function ({ openDialog, selectedRoomPrice }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    { name: "roomId", value: selectedRoomPrice?.roomId ?? "", type: "ID" },

    {
      name: "startDate",
      value: selectedRoomPrice?.startDate ?? "",
      type: "Date",
    },

    { name: "endDate", value: selectedRoomPrice?.endDate ?? "", type: "Date" },

    { name: "price", value: selectedRoomPrice?.price ?? "", type: "Double" },

    {
      name: "priceType",
      value: selectedRoomPrice?.priceType ?? "",
      type: "Enum",
    },

    {
      name: "description",
      value: selectedRoomPrice?.description ?? "",
      type: "String",
    },
  ];

  const defaultValues = {
    roomId: selectedRoomPrice?.roomId ?? "",

    startDate: selectedRoomPrice?.startDate ?? "",

    endDate: selectedRoomPrice?.endDate ?? "",

    price: selectedRoomPrice?.price ?? "",

    priceType: selectedRoomPrice?.priceType ?? "",

    description: selectedRoomPrice?.description ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(RoompriceSchema),
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
      if (selectedRoomPrice?.id) {
        const response = await roomPricingAxios.patch(
          roomPricingEndpoints.roomPrice.updateRoomPrice.replace(
            ":roomPriceId",
            selectedRoomPrice?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([roomPricingEndpoints.roomPrice.listRoomPrices]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      roomId: selectedRoomPrice?.roomId ?? "",

      startDate: selectedRoomPrice?.startDate ?? "",

      endDate: selectedRoomPrice?.endDate ?? "",

      price: selectedRoomPrice?.price ?? "",

      priceType: selectedRoomPrice?.priceType ?? "",

      description: selectedRoomPrice?.description ?? "",
    });
  }, [selectedRoomPrice]);

  if (!selectedRoomPrice) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update RoomPrice</DialogTitle>

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
                : "An error occurred while creating the roomPrice."}
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
