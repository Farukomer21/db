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

import { usePackageManagementGetPackage } from "src/actions/packageManagement";

import { JsonResponse } from "../../../../components/json-response";
import { TableResponse } from "../../../../components/table-response";

export default function PackageManagementGetPackageApiPage() {
  const [view, setView] = useState("Table");

  const [inputPackage_Id, setInputPackage_Id] = useState("");
  const [submittedPackage_Id, setSubmittedPackage_Id] = useState(null);

  const { package_, package_Loading, package_Error } =
    usePackageManagementGetPackage(submittedPackage_Id);

  const handleGetPackage_ = () => {
    setSubmittedPackage_Id(inputPackage_Id);
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
              label="package_Id"
              value={inputPackage_Id}
              onChange={(e) => setInputPackage_Id(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleGetPackage_}
            disabled={!inputPackage_Id || package_Loading}
          >
            GET
          </Button>
        </Box>
      </Box>

      <Divider />

      {!package_Loading && (package_Error || package_) && (
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
                color={package_Error ? "error" : "success"}
                display="inline"
              >
                {package_Error ? package_Error.status : "200"}
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
              <TableResponse content={package_} error={package_Error} />
            ) : (
              <JsonResponse content={package_ || package_Error} />
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
