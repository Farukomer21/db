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

import packageManagementAxios, {
  packageManagementEndpoints,
} from "../../../../lib/packageManagement-axios.js";

const UPDATE_TABLE_HEAD = [
  { id: "propertyName", label: "Property Name", width: "30%" },
  { id: "propertyValue", label: "Property Value", width: "70%" },
];

const Package_Schema = zod.object({
  name: zod.string().nullable(),

  description: zod.string().nullable(),

  price: zod.number().nullable(),

  duration: zod.string().nullable(),

  conditions: zod.string().nullable(),
});

export default function ({ openDialog, selectedPackage_ }) {
  const [error, setError] = useState(null);

  const theme = useTheme();

  const requestParams = [
    { name: "name", value: selectedPackage_?.name ?? "", type: "String" },

    {
      name: "description",
      value: selectedPackage_?.description ?? "",
      type: "String",
    },

    { name: "price", value: selectedPackage_?.price ?? "", type: "Double" },

    {
      name: "duration",
      value: selectedPackage_?.duration ?? "",
      type: "String",
    },

    {
      name: "conditions",
      value: selectedPackage_?.conditions ?? "",
      type: "String",
    },
  ];

  const defaultValues = {
    name: selectedPackage_?.name ?? "",

    description: selectedPackage_?.description ?? "",

    price: selectedPackage_?.price ?? "",

    duration: selectedPackage_?.duration ?? "",

    conditions: selectedPackage_?.conditions ?? "",
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
      if (selectedPackage_?.id) {
        const response = await packageManagementAxios.patch(
          packageManagementEndpoints.package_.updatePackage.replace(
            ":package_Id",
            selectedPackage_?.id,
          ),
          data,
        );
        setError(null);
        reset();
        console.info("RESPONSE", response);
        await mutate([packageManagementEndpoints.package_.listPackages]);
        openDialog.onFalse();
      }
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  useEffect(() => {
    methods.reset({
      name: selectedPackage_?.name ?? "",

      description: selectedPackage_?.description ?? "",

      price: selectedPackage_?.price ?? "",

      duration: selectedPackage_?.duration ?? "",

      conditions: selectedPackage_?.conditions ?? "",
    });
  }, [selectedPackage_]);

  if (!selectedPackage_) return null;

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Update Package_</DialogTitle>

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
