import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { JsonResponse } from "../../../../components/json-response/index.js";
import { TableResponse } from "../../../../components/table-response/index.js";
import reservationManagementAxios, {
  reservationManagementEndpoints,
} from "../../../../lib/reservationManagement-axios.js";

export default function ReservationManagementDeleteReservationApiPage() {
  const [view, setView] = useState("Table");
  const [deletedReservation, setDeletedReservation] = useState(null);
  const [reservationLoading, setReservationLoading] = useState(false);

  const [error, setError] = useState(null);

  const [inputReservationId, setInputReservationId] = useState("");

  const handleDeleteReservation = async () => {
    try {
      setReservationLoading(true);
      const response = await reservationManagementAxios.delete(
        reservationManagementEndpoints.reservation.deleteReservation.replace(
          ":reservationId",
          inputReservationId,
        ),
      );
      setError(null);
      setDeletedReservation(null);
      console.info("RESPONSE", response);
      setDeletedReservation(response.data.reservation);
      setReservationLoading(false);

      setInputReservationId("");
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setReservationLoading(false);
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
                label="reservationId"
                value={inputReservationId}
                onChange={(e) => setInputReservationId(e.target.value)}
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteReservation}
              disabled={!inputReservationId || reservationLoading}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />

      {!reservationLoading && (error || deletedReservation) && (
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
              <TableResponse content={deletedReservation} error={error} />
            ) : (
              <JsonResponse content={deletedReservation || error} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
