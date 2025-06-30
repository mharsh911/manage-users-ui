import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { FC } from "react";
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

  const handleDeleteUser = async () => {
    await userService.deleteUser(user.id);
    await fetchUsers(0, 5);
    handleModal();
    toast.success("User deleted successfully!");
  };

  return (
    <Dialog open={open} onClose={handleModal}>
      <DialogTitle>Confirm Delete User</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this user - {user.firstName}{" "}
        {user.lastName}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleDeleteUser}>
          Confirm
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
