import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { JsonResponse } from "../../../../components/json-response/index.js";
import { TableResponse } from "../../../../components/table-response/index.js";
import packageReservationMappingAxios, {
  packageReservationMappingEndpoints,
} from "../../../../lib/packageReservationMapping-axios.js";

export default function PackageReservationMappingDeletePackageReservationApiPage() {
  const [view, setView] = useState("Table");
  const [deletedPackagereservation, setDeletedPackagereservation] =
    useState(null);
  const [packageReservationLoading, setPackagereservationLoading] =
    useState(false);

  const [error, setError] = useState(null);

  const [inputPackageReservationId, setInputPackageReservationId] =
    useState("");

  const handleDeletePackagereservation = async () => {
    try {
      setPackagereservationLoading(true);
      const response = await packageReservationMappingAxios.delete(
        packageReservationMappingEndpoints.packageReservation.deletePackageReservation.replace(
          ":packageReservationId",
          inputPackageReservationId,
        ),
      );
      setError(null);
      setDeletedPackagereservation(null);
      console.info("RESPONSE", response);
      setDeletedPackagereservation(response.data.packageReservation);
      setPackagereservationLoading(false);

      setInputPackageReservationId("");
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setPackagereservationLoading(false);
    }
  };

  return (
    <Box>
      <Box marginY="2rem">
        <Box marginBottom="2rem">
          <Typography variant="h4" marginBottom="1.5rem">
            DELETE
          </Typography>

          <Box component="div" gap="1rem" display="flex" key="0">
            <Box minWidth="35%">
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                label="packageReservationId"
                value={inputPackageReservationId}
                onChange={(e) => setInputPackageReservationId(e.target.value)}
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeletePackagereservation}
              disabled={!inputPackageReservationId || packageReservationLoading}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />

      {!packageReservationLoading && (error || deletedPackagereservation) && (
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
                {error ? error.status : "200"}
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
              <TableResponse
                content={deletedPackagereservation}
                error={error}
              />
            ) : (
              <JsonResponse content={deletedPackagereservation || error} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
