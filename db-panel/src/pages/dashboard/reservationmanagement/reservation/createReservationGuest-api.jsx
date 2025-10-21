import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Chip,
  Link,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  ToggleButton,
  TableContainer,
  ToggleButtonGroup,
} from "@mui/material";

import { Form, Field } from "../../../../components/hook-form";
import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";
import reservationManagementAxios, {
  reservationManagementEndpoints,
} from "../../../../lib/reservationManagement-axios.js";

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

const ReservationguestSchema = zod.object({
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

export default function ReservationManagementCreateReservationGuestApiPage() {
  const [view, setView] = useState("Table");
  const [createdReservationguest, setCreatedReservationguest] = useState(null);
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
    resolver: zodResolver(ReservationguestSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await reservationManagementAxios.post(
        reservationManagementEndpoints.reservation.createReservationGuest,
        data,
      );
      setError(null);
      setCreatedReservationguest(null);
      reset();
      console.info("RESPONSE", response);
      setCreatedReservationguest(response.data.reservation);
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box marginY="2rem">
        <Typography variant="h4" marginBottom="1.5rem">
          CREATE
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="30%">
                  <Typography variant="body1" fontWeight="bold">
                    Property Name
                  </Typography>
                </TableCell>
                <TableCell width="70%">
                  <Typography variant="body1" fontWeight="bold">
                    Property Value
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestParams.map((row) => (
                <TableRow key={row.name}>
                  <TableCell sx={{ backgroundColor: theme.palette.grey[100] }}>
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
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Link component="button" underline="always" onClick={reset}>
            Cancel
          </Link>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
      <Divider />
      {(createdReservationguest || error) && (
        <Box paddingTop="2rem">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">
              STATUS:{" "}
              <Typography
                component="span"
                variant="subtitle1"
                color={error ? "error" : "success"}
                display="inline"
              >
                {error ? (error.status ?? "500") : "201"}
              </Typography>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <ToggleButtonGroup
                color="standard"
                value={view}
                exclusive
                onChange={(_, val) => val && setView(val)}
              >
                <ToggleButton value="Table" sx={{ paddingX: "2rem" }}>
                  Table
                </ToggleButton>
                <ToggleButton value="JSON" sx={{ paddingX: "2rem" }}>
                  JSON
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box>
            {view === "Table" ? (
              <TableResponse content={createdReservationguest} error={error} />
            ) : (
              <JsonResponse content={createdReservationguest || error} />
            )}
          </Box>
        </Box>
      )}
    </Form>
  );
}
