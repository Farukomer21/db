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

import { useRoomInventoryGetRoom } from "src/actions/roomInventory";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function RoomInventoryGetRoomApiPage() {
  const [view, setView] = useState("Table");

  const [inputRoomId, setInputRoomId] = useState("");
  const [submittedRoomId, setSubmittedRoomId] = useState(null);

  const { room, roomLoading, roomError } =
    useRoomInventoryGetRoom(submittedRoomId);

  const handleGetRoom = () => {
    setSubmittedRoomId(inputRoomId);
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
              label="roomId"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetRoom}
            disabled={!inputRoomId || roomLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!roomLoading && (roomError || room) && (
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
                color={roomError ? "error" : "success"}
                display="inline"
              >
                {roomError ? roomError.status : "200"}
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
              <TableResponse content={room} error={roomError} />
            ) : (
              <JsonResponse content={room || roomError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
