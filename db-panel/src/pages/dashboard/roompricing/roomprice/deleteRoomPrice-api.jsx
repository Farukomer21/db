import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { JsonResponse } from "../../../../components/json-response/index.js";
import { TableResponse } from "../../../../components/table-response/index.js";
import roomPricingAxios, {
  roomPricingEndpoints,
} from "../../../../lib/roomPricing-axios.js";

export default function RoomPricingDeleteRoomPriceApiPage() {
  const [view, setView] = useState("Table");
  const [deletedRoomprice, setDeletedRoomprice] = useState(null);
  const [roomPriceLoading, setRoompriceLoading] = useState(false);

  const [error, setError] = useState(null);

  const [inputRoomPriceId, setInputRoomPriceId] = useState("");

  const handleDeleteRoomprice = async () => {
    try {
      setRoompriceLoading(true);
      const response = await roomPricingAxios.delete(
        roomPricingEndpoints.roomPrice.deleteRoomPrice.replace(
          ":roomPriceId",
          inputRoomPriceId,
        ),
      );
      setError(null);
      setDeletedRoomprice(null);
      console.info("RESPONSE", response);
      setDeletedRoomprice(response.data.roomPrice);
      setRoompriceLoading(false);

      setInputRoomPriceId("");
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setRoompriceLoading(false);
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
                label="roomPriceId"
                value={inputRoomPriceId}
                onChange={(e) => setInputRoomPriceId(e.target.value)}
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteRoomprice}
              disabled={!inputRoomPriceId || roomPriceLoading}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />

      {!roomPriceLoading && (error || deletedRoomprice) && (
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
              <TableResponse content={deletedRoomprice} error={error} />
            ) : (
              <JsonResponse content={deletedRoomprice || error} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
