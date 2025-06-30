import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridPaginationModel,
  type GridRowId,
} from "@mui/x-data-grid";
import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { userService } from "../user-service";
import type { TUser } from "../interfaces";
import { DeleteUserConfirmation } from "./DeleteUserConfirmation";
import { useUserColumns } from "../hooks/useUserColumns";

interface IExtendedUser extends TUser {
  index: number;
}

export default function UserList() {
  const [users, setUsers] = useState<IExtendedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const fetchUsers = async (page: number, pageSize: number) => {
    try {
      setLoading(true);
      const res = await userService.getUsers(page, pageSize);
      const { data: fetchedUsers, items } = res;
      const offset = page * pageSize;
      const mappedUsers = fetchedUsers.map((user, index) => ({
        ...user,
        index: offset + index + 1,
      }));
      setUsers(mappedUsers);
      setRowCount(items);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (id: GridRowId) => {
    navigate(`/edit-user/${id}`);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    fetchUsers(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const columns = useUserColumns({
    isMobile,
    handleEditUser,
    setOpenDeleteModal,
    setSelectedUser,
  });

  return (
    <div style={{ width: "100%" }}>
      <DataGrid<IExtendedUser>
        rows={users}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        initialState={{}}
        disableRowSelectionOnClick
      />
      {openDeleteModal && (
        <DeleteUserConfirmation
          open={openDeleteModal}
          handleModal={handleCloseDeleteModal}
          user={selectedUser}
          fetchUsers={fetchUsers}
        />
      )}
    </div>
  );
}
