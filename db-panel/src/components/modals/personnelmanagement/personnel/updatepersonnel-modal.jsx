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

import personnelManagementAxios, {
  personnelManagementEndpoints,
} from "../../../../lib/personnelManagement-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const PersonnelSchema = zod.object({
  name: zod.string().nullable(),

  jobTitle: zod.string().nullable(),

  department: zod.string().nullable(),

  startDate: zod.string().nullable(),

  endDate: zod.string().nullable(),

  contactInfo: zod.string().nullable(),

  notes: zod.string().nullable(),
});

export default function ({ openDialog, selectedPersonnel }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    { name: "name", value: selectedPersonnel?.name ?? "", type: "String" },

    {
      name: "jobTitle",
      value: selectedPersonnel?.jobTitle ?? "",
      type: "String",
    },

    {
      name: "department",
      value: selectedPersonnel?.department ?? "",
      type: "String",
    },

    {
      name: "startDate",
      value: selectedPersonnel?.startDate ?? "",
      type: "Date",
    },

    { name: "endDate", value: selectedPersonnel?.endDate ?? "", type: "Date" },

    {
      name: "contactInfo",
      value: selectedPersonnel?.contactInfo ?? "",
      type: "String",
    },

    { name: "notes", value: selectedPersonnel?.notes ?? "", type: "String" },
  ];

  const defaultValues = {
    name: selectedPersonnel?.name ?? "",

    jobTitle: selectedPersonnel?.jobTitle ?? "",

    department: selectedPersonnel?.department ?? "",

    startDate: selectedPersonnel?.startDate ?? "",

    endDate: selectedPersonnel?.endDate ?? "",

    contactInfo: selectedPersonnel?.contactInfo ?? "",

    notes: selectedPersonnel?.notes ?? "",
  };

  const methods = useForm({
    resolver: zodResolver(PersonnelSchema),
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
      if (selectedPersonnel?.id) {
        const response = await personnelManagementAxios.patch(
          personnelManagementEndpoints.personnel.updatePersonnel.replace(
            ":personnelId",
            selectedPersonnel?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([personnelManagementEndpoints.personnel.listPersonnels]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      name: selectedPersonnel?.name ?? "",

      jobTitle: selectedPersonnel?.jobTitle ?? "",

      department: selectedPersonnel?.department ?? "",

      startDate: selectedPersonnel?.startDate ?? "",

      endDate: selectedPersonnel?.endDate ?? "",

      contactInfo: selectedPersonnel?.contactInfo ?? "",

      notes: selectedPersonnel?.notes ?? "",
    });
  }, [selectedPersonnel]);

  if (!selectedPersonnel) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update Personnel</DialogTitle>

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
                : "An error occurred while creating the personnel."}
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
