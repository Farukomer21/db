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
  TextField,
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
import packageManagementAxios, {
  packageManagementEndpoints,
} from "../../../../lib/packageManagement-axios.js";

const requestParams = [
  { name: "name", value: "", type: "String" },

  { name: "description", value: "", type: "String" },

  { name: "price", value: "", type: "Double" },

  { name: "duration", value: "", type: "String" },

  { name: "conditions", value: "", type: "String" },
];

const Package_Schema = zod.object({
  name: zod.string().nullable(),

  description: zod.string().nullable(),

  price: zod.number().nullable(),

  duration: zod.string().nullable(),

  conditions: zod.string().nullable(),
});

export default function PackageManagementUpdatePackageApiPage() {
  const [view, setView] = useState("Table");
  const [updatedPackage_, setUpdatedPackage_] = useState(null);
  const [error, setError] = useState(null);

  const [inputPackage_Id, setInputPackage_Id] = useState("");

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

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await packageManagementAxios.patch(
        packageManagementEndpoints.package_.updatePackage.replace(
          ":package_Id",
          inputPackage_Id,
        ),
        data,
      );
      setError(null);
      setUpdatedPackage_(null);
      reset();
      console.info("RESPONSE", response);
      setUpdatedPackage_(response.data.package_);
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box marginY="2rem">
        <Box marginBottom="2rem">
          <Typography variant="h4" marginBottom="1.5rem">
            UPDATE
          </Typography>

          <Box component="div" gap="1rem" display="flex" key="0">
            <Box minWidth="35%">
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                label="package_Id"
                value={inputPackage_Id}
                onChange={(e) => setInputPackage_Id(e.target.value)}
              />
            </Box>
          </Box>
        </Box>

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
          <Link component="button" underline="always" onClick={() => reset()}>
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
      {(updatedPackage_ || error) && (
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
                {error ? (error.status ?? "500") : "200"}
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
              <TableResponse content={updatedPackage_} error={error} />
            ) : (
              <JsonResponse content={updatedPackage_ || error} />
            )}
          </Box>
        </Box>
      )}
    </Form>
  );
}
