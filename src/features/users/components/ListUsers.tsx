import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridRowId,
} from "@mui/x-data-grid";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { userService } from "../user-service";
import type { TUser } from "../interfaces";

interface IExtendedUser extends TUser {
  index: number;
}

export default function UserList() {
  const [users, setUsers] = useState<IExtendedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
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

      setUsers(
        fetchedUsers.map((user, index) => ({
          ...user,
          index: offset + index + 1,
        }))
      );
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

  useEffect(() => {
    fetchUsers(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const getColumns = () => {
    const commonColumns: GridColDef[] = [
      { field: "index", headerName: "ID", width: 60 },
      { field: "firstName", headerName: "Name", flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          const { id } = params;
          return (
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <IconButton onClick={() => handleEditUser(id)}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          );
        },
      },
    ];

    const fullColumns: GridColDef[] = [
      ...commonColumns.slice(0, 2), // index + firstName
      { field: "lastName", headerName: "Last Name", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "address", headerName: "Address", flex: 1 },
      { field: "phoneNumber", headerName: "Phone", flex: 1 },
      ...commonColumns.slice(2), // actions
    ];

    const columns = isMobile ? commonColumns : fullColumns;

    return columns;
  };

  return (
    <div style={{ width: "100%" }}>
      <DataGrid<IExtendedUser>
        rows={users}
        columns={getColumns()}
        rowCount={rowCount}
        loading={loading}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        initialState={{}}
        disableRowSelectionOnClick
      />
    </div>
  );
}
