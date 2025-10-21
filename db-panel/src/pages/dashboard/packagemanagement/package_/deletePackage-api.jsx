import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { JsonResponse } from "../../../../components/json-response/index.js";
import { TableResponse } from "../../../../components/table-response/index.js";
import packageManagementAxios, {
  packageManagementEndpoints,
} from "../../../../lib/packageManagement-axios.js";

export default function PackageManagementDeletePackageApiPage() {
  const [view, setView] = useState("Table");
  const [deletedPackage_, setDeletedPackage_] = useState(null);
  const [package_Loading, setPackage_Loading] = useState(false);

  const [error, setError] = useState(null);

  const [inputPackage_Id, setInputPackage_Id] = useState("");

  const handleDeletePackage_ = async () => {
    try {
      setPackage_Loading(true);
      const response = await packageManagementAxios.delete(
        packageManagementEndpoints.package_.deletePackage.replace(
          ":package_Id",
          inputPackage_Id,
        ),
      );
      setError(null);
      setDeletedPackage_(null);
      console.info("RESPONSE", response);
      setDeletedPackage_(response.data.package_);
      setPackage_Loading(false);

      setInputPackage_Id("");
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setPackage_Loading(false);
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
                label="package_Id"
                value={inputPackage_Id}
                onChange={(e) => setInputPackage_Id(e.target.value)}
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeletePackage_}
              disabled={!inputPackage_Id || package_Loading}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />

      {!package_Loading && (error || deletedPackage_) && (
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
              <TableResponse content={deletedPackage_} error={error} />
            ) : (
              <JsonResponse content={deletedPackage_ || error} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
