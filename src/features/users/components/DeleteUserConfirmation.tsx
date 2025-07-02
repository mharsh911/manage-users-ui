import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useState, type FC } from "react";
import { userService } from "../user-service";
import type { TUser } from "../interfaces";
import { toast } from "react-toastify";

interface IDeleteUserConfirmationProps {
  open: boolean;
  handleModal: () => void;
  user: TUser;
  fetchUsers: (page: number, pageSize: number) => Promise<void>;
}

export const DeleteUserConfirmation: FC<IDeleteUserConfirmationProps> = (
  props
) => {
  const { open, handleModal, user, fetchUsers } = props;
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    setLoading(true);
    await userService.deleteUser(user.id);
    await fetchUsers(0, 10);
    setLoading(false);
    handleModal();
    toast.success("User deleted successfully!");
  };

  return (
    <Dialog open={open} onClose={handleModal} maxWidth="xs" fullWidth>
      <DialogTitle>Delete User</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the following user?
        </DialogContentText>
        <Typography variant="h6" color="error" sx={{ mt: 1 }}>
          {user.firstName} {user.lastName}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: 1,
          }}
        >
          <Button
            onClick={handleModal}
            variant="outlined"
            color="secondary"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            variant="contained"
            color="error"
            disabled={loading}
            sx={{ textTransform: "none" }}
          >
            Confirm Delete
            {loading && <CircularProgress size={16} sx={{ color: "white" }} />}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
