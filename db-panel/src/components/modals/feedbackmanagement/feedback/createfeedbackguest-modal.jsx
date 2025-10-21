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

import feedbackManagementAxios, {
  feedbackManagementEndpoints,
} from "../../../../lib/feedbackManagement-axios.js";

const ADD_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const requestParams = [
  { name: "reservationId", value: "", type: "ID" },

  { name: "guestName", value: "", type: "String" },

  { name: "rating", value: "", type: "Integer" },

  { name: "comment", value: "", type: "Text" },
];

const FeedbackguestSchema = zod.object({
  reservationId: zod.string().min(1, { message: "reservationId is required" }),

  guestName: zod.string().min(1, { message: "guestName is required" }),

  rating: zod.number().min(1, { message: "rating is required" }),

  comment: zod.string().min(1, { message: "comment is required" }),
});

export default function ({ openDialog }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    reservationId: "",

    guestName: "",

    rating: "",

    comment: "",
  };

  const methods = useForm({
    resolver: zodResolver(FeedbackguestSchema),
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
      const response = await feedbackManagementAxios.post(
        feedbackManagementEndpoints.feedback.createFeedbackGuest,
        data,
      );
      setError(null);
      reset();
      console.info("RESPONSE", response);
      await mutate([feedbackManagementEndpoints.feedback.listFeedbacks]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Create Feedback</DialogTitle>

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
                : "An error occurred while creating the feedback."}
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
