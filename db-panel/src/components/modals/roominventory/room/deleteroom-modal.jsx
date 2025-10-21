import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from "@mui/material";
import { useState } from "react";
import roomInventoryAxios, {
  roomInventoryEndpoints,
} from "../../../../lib/roomInventory-axios.js";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

export default function ({ openDialog, selectedId }) {
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await roomInventoryAxios.delete(
        roomInventoryEndpoints.room.deleteRoom.replace(":roomId", selectedId),
      );
      setError(null);
      console.info("RESPONSE", response);
      setIsDeleting(false);
      await mutate([roomInventoryEndpoints.room.listRooms]);
      openDialog.onFalse();
    } catch (ex) {
      console.error(ex);
      setError(ex);
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={openDialog.value} maxWidth="md">
      <DialogTitle>Delete Room</DialogTitle>
      <DialogContent>
        do you want to delete the room with id: {selectedId}
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
