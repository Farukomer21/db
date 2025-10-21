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

import specialRequestManagementAxios, {
  specialRequestManagementEndpoints,
} from "../../../../lib/specialRequestManagement-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const SpecialrequestSchema = zod.object({
  reservationId: zod.string().nullable(),

  guestId: zod.string().nullable(),

  requestText: zod.string().nullable(),

  status: zod.string().nullable(),

  response: zod.string().nullable(),
});

export default function ({ openDialog, selectedSpecialRequest }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    {
      name: "reservationId",
      value: selectedSpecialRequest?.reservationId ?? "",
      type: "ID",
    },

    {
      name: "guestId",
      value: selectedSpecialRequest?.guestId ?? "",
      type: "ID",
    },

    {
      name: "requestText",
      value: selectedSpecialRequest?.requestText ?? "",
      type: "String",
    },

    {
      name: "status",
      value: selectedSpecialRequest?.status ?? "",
      type: "Enum",
    },

    {
      name: "response",
      value: selectedSpecialRequest?.response ?? "",
      type: "String",
    },
  ];

  const defaultValues = {
    reservationId: selectedSpecialRequest?.reservationId ?? "",

    guestId: selectedSpecialRequest?.guestId ?? "",

    requestText: selectedSpecialRequest?.requestText ?? "",

    status: selectedSpecialRequest?.status ?? "",

    response: selectedSpecialRequest?.response ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(SpecialrequestSchema),
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
      if (selectedSpecialRequest?.id) {
        const response = await specialRequestManagementAxios.patch(
          specialRequestManagementEndpoints.specialRequest.updateSpecialRequest.replace(
            ":specialRequestId",
            selectedSpecialRequest?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([
          specialRequestManagementEndpoints.specialRequest.listSpecialRequests,
        ]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      reservationId: selectedSpecialRequest?.reservationId ?? "",

      guestId: selectedSpecialRequest?.guestId ?? "",

      requestText: selectedSpecialRequest?.requestText ?? "",

      status: selectedSpecialRequest?.status ?? "",

      response: selectedSpecialRequest?.response ?? "",
    });
  }, [selectedSpecialRequest]);

  if (!selectedSpecialRequest) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update SpecialRequest</DialogTitle>

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
                : "An error occurred while creating the specialRequest."}
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
