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

import { usePaymentManagementGetPayment } from "src/actions/paymentManagement";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function PaymentManagementGetPaymentApiPage() {
  const [view, setView] = useState("Table");

  const [inputPaymentId, setInputPaymentId] = useState("");
  const [submittedPaymentId, setSubmittedPaymentId] = useState(null);

  const { payment, paymentLoading, paymentError } =
    usePaymentManagementGetPayment(submittedPaymentId);

  const handleGetPayment = () => {
    setSubmittedPaymentId(inputPaymentId);
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
              label="paymentId"
              value={inputPaymentId}
              onChange={(e) => setInputPaymentId(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetPayment}
            disabled={!inputPaymentId || paymentLoading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!paymentLoading && (paymentError || payment) && (
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
                color={paymentError ? "error" : "success"}
                display="inline"
              >
                {paymentError ? paymentError.status : "200"}
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
              <TableResponse content={payment} error={paymentError} />
            ) : (
              <JsonResponse content={payment || paymentError} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
