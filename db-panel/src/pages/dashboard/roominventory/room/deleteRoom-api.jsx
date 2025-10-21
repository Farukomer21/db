import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { JsonResponse } from "../../../../components/json-response/index.js";
import { TableResponse } from "../../../../components/table-response/index.js";
import roomInventoryAxios, {
  roomInventoryEndpoints,
} from "../../../../lib/roomInventory-axios.js";

export default function RoomInventoryDeleteRoomApiPage() {
  const [view, setView] = useState("Table");
  const [deletedRoom, setDeletedRoom] = useState(null);
  const [roomLoading, setRoomLoading] = useState(false);

  const [error, setError] = useState(null);

  const [inputRoomId, setInputRoomId] = useState("");

  const handleDeleteRoom = async () => {
    try {
      setRoomLoading(true);
      const response = await roomInventoryAxios.delete(
        roomInventoryEndpoints.room.deleteRoom.replace(":roomId", inputRoomId),
      );
      setError(null);
      setDeletedRoom(null);
      console.info("RESPONSE", response);
      setDeletedRoom(response.data.room);
      setRoomLoading(false);

      setInputRoomId("");
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setRoomLoading(false);
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
                label="roomId"
                value={inputRoomId}
                onChange={(e) => setInputRoomId(e.target.value)}
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteRoom}
              disabled={!inputRoomId || roomLoading}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />

      {!roomLoading && (error || deletedRoom) && (
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
              <TableResponse content={deletedRoom} error={error} />
            ) : (
              <JsonResponse content={deletedRoom || error} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
