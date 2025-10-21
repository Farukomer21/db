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
import roomPricingAxios, {
  roomPricingEndpoints,
} from "../../../../lib/roomPricing-axios.js";

const requestParams = [
  { name: "roomId", value: "", type: "ID" },

  { name: "startDate", value: "", type: "Date" },

  { name: "endDate", value: "", type: "Date" },

  { name: "price", value: "", type: "Double" },

  { name: "priceType", value: "", type: "Enum" },

  { name: "description", value: "", type: "String" },
];

const RoompriceSchema = zod.object({
  roomId: zod.string().min(1, { message: "roomId is required" }),

  startDate: zod.string().min(1, { message: "startDate is required" }),

  endDate: zod.string().nullable(),

  price: zod.number().min(1, { message: "price is required" }),

  priceType: zod.string().min(1, { message: "priceType is required" }),

  description: zod.string().nullable(),
});

export default function RoomPricingCreateRoomPriceApiPage() {
  const [view, setView] = useState("Table");
  const [createdRoomprice, setCreatedRoomprice] = useState(null);
  const [error, setError] = useState(null);

  const theme = useTheme();

  const defaultValues = {
    roomId: "",

    startDate: "",

    endDate: "",

    price: "",

    priceType: "",

    description: "",
  };

  const methods = useForm({
    resolver: zodResolver(RoompriceSchema),
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
      const response = await roomPricingAxios.post(
        roomPricingEndpoints.roomPrice.createRoomPrice,
        data,
      );
      setError(null);
      setCreatedRoomprice(null);
      reset();
      console.info("RESPONSE", response);
      setCreatedRoomprice(response.data.roomPrice);
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box marginY="2rem">
        <Typography variant="h4" marginBottom="1.5rem">
          CREATE
        </Typography>

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
          <Link component="button" underline="always" onClick={reset}>
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
      {(createdRoomprice || error) && (
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
                {error ? (error.status ?? "500") : "201"}
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
              <TableResponse content={createdRoomprice} error={error} />
            ) : (
              <JsonResponse content={createdRoomprice || error} />
            )}
          </Box>
        </Box>
      )}
    </Form>
  );
}
