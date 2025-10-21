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

import packageManagementAxios, {
  packageManagementEndpoints,
} from "../../../../lib/packageManagement-axios.js";

const ADD_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const requestParams = [
  { name: "name", value: "", type: "String" },

  { name: "description", value: "", type: "String" },

  { name: "price", value: "", type: "Double" },

  { name: "duration", value: "", type: "String" },

  { name: "conditions", value: "", type: "String" },
];

const Package_Schema = zod.object({
  name: zod.string().min(1, { message: "name is required" }),

  description: zod.string().min(1, { message: "description is required" }),

  price: zod.number().min(1, { message: "price is required" }),

  duration: zod.string().nullable(),

  conditions: zod.string().nullable(),
});

export default function ({ openDialog }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    name: "",

    description: "",

    price: "",

    duration: "",

    conditions: "",
  };

  const methods = useForm({
    resolver: zodResolver(Package_Schema),
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
      const response = await packageManagementAxios.post(
        packageManagementEndpoints.package_.createPackage,
        data,
      );
      setError(null);
      reset();
      console.info("RESPONSE", response);
      await mutate([packageManagementEndpoints.package_.listPackages]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Create Package_</DialogTitle>

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
                : "An error occurred while creating the package_."}
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
