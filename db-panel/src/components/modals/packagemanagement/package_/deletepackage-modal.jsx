import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from "@mui/material";
import { useState } from "react";
import packageManagementAxios, {
  packageManagementEndpoints,
} from "../../../../lib/packageManagement-axios.js";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

export default function ({ openDialog, selectedId }) {
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await packageManagementAxios.delete(
        packageManagementEndpoints.package_.deletePackage.replace(
          ":package_Id",
          selectedId,
        ),
      );
      setError(null);
      console.info("RESPONSE", response);
      setIsDeleting(false);
      await mutate([packageManagementEndpoints.package_.listPackages]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Delete Package_</DialogTitle>
      <DialogContent>
        do you want to delete the package_ with id: {selectedId}
      </DialogContent>
      <DialogActions className="gap-2">
        <Link
          component="button"
          type="button"
          underline="always"
          onClick={openDialog.onFalse}
        >
          No
        </Link>
        <LoadingButton
          type="button"
          onClick={handleDelete}
          variant="contained"
          size="large"
          loading={isDeleting}
          color="error"
        >
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
