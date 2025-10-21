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

import { useRoomPricingGetRoomPrice } from "src/actions/roomPricing";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function RoomPricingGetRoomPriceApiPage() {
  const [view, setView] = useState("Table");

  const [inputRoomPriceId, setInputRoomPriceId] = useState("");
  const [submittedRoomPriceId, setSubmittedRoomPriceId] = useState(null);

  const { roomPrice, roomPriceLoading, roomPriceError } =
    useRoomPricingGetRoomPrice(submittedRoomPriceId);

  const handleGetRoomprice = () => {
    setSubmittedRoomPriceId(inputRoomPriceId);
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
              label="roomPriceId"
              value={inputRoomPriceId}
              onChange={(e) => setInputRoomPriceId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetRoomprice}
            disabled={!inputRoomPriceId || roomPriceLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!roomPriceLoading && (roomPriceError || roomPrice) && (
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
                color={roomPriceError ? "error" : "success"}
                display="inline"
              >
                {roomPriceError ? roomPriceError.status : "200"}
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
              <TableResponse content={roomPrice} error={roomPriceError} />
            ) : (
              <JsonResponse content={roomPrice || roomPriceError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
