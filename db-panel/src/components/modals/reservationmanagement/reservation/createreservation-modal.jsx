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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

import reservationManagementAxios, {
  reservationManagementEndpoints,
} from "../../../../lib/reservationManagement-axios.js";

const ADD_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const requestParams = [
  { name: "guestId", value: "", type: "ID" },

  { name: "roomId", value: "", type: "ID" },

  { name: "checkInDate", value: "", type: "Date" },

  { name: "checkOutDate", value: "", type: "Date" },

  { name: "packages", value: "", type: "ID" },

  { name: "specialRequests", value: "", type: "ID" },

  { name: "paymentId", value: "", type: "ID" },

  { name: "status", value: "", type: "Enum" },

  { name: "numGuests", value: "", type: "Integer" },

  { name: "totalPrice", value: "", type: "Double" },

  { name: "notes", value: "", type: "Text" },
];

const ReservationSchema = zod.object({
  guestId: zod.string().min(1, { message: "guestId is required" }),

  roomId: zod.string().min(1, { message: "roomId is required" }),

  checkInDate: zod.string().min(1, { message: "checkInDate is required" }),

  checkOutDate: zod.string().min(1, { message: "checkOutDate is required" }),

  packages: zod.string().nullable(),

  specialRequests: zod.string().nullable(),

  paymentId: zod.string().nullable(),

  status: zod.string().min(1, { message: "status is required" }),

  numGuests: zod.number().min(1, { message: "numGuests is required" }),

  totalPrice: zod.number().min(1, { message: "totalPrice is required" }),

  notes: zod.string().nullable(),
});

export default function ({ openDialog }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    guestId: "",

    roomId: "",

    checkInDate: "",

    checkOutDate: "",

    packages: "",

    specialRequests: "",

    paymentId: "",

    status: "",

    numGuests: "",

    totalPrice: "",

    notes: "",
  };

  const methods = useForm({
    resolver: zodResolver(ReservationSchema),
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
      const response = await reservationManagementAxios.post(
        reservationManagementEndpoints.reservation.createReservation,
        data,
      );
      setError(null);
      reset();
      console.info("RESPONSE", response);
      await mutate([
        reservationManagementEndpoints.reservation.listReservations,
      ]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Create Reservation</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }}>
              <TableHeadCustom headCells={ADD_TABLE_HEAD} />

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
                : "An error occurred while creating the reservation."}
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
