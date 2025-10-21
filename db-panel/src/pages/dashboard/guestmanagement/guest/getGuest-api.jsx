import { useState } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
  Button,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { useGuestManagementGetGuest } from "src/actions/guestManagement";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function GuestManagementGetGuestApiPage() {
  const [view, setView] = useState("Table");

  const [inputGuestId, setInputGuestId] = useState("");
  const [submittedGuestId, setSubmittedGuestId] = useState(null);

  const { guest, guestLoading, guestError } =
    useGuestManagementGetGuest(submittedGuestId);

  const handleGetGuest = () => {
    setSubmittedGuestId(inputGuestId);
  };

  return (
    <>
      <Box marginY="2rem">
        <Typography variant="h4" marginBottom="1.5rem">
          GET
        </Typography>

        <Box component="div" gap="1rem" display="flex" key="0">
          <Box minWidth="35%">
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              label="guestId"
              value={inputGuestId}
              onChange={(e) => setInputGuestId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetGuest}
            disabled={!inputGuestId || guestLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!guestLoading && (guestError || guest) && (
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
                color={guestError ? "error" : "success"}
                display="inline"
              >
                {guestError ? guestError.status : "200"}
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
              <TableResponse content={guest} error={guestError} />
            ) : (
              <JsonResponse content={guest || guestError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
