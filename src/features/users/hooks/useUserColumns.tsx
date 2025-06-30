import { Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { Dispatch, SetStateAction } from "react";
import type { GridColDef } from "@mui/x-data-grid";

interface IUserColumnsParams {
  isMobile: boolean;
  handleEditUser: (id: string | number) => void;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  setSelectedUser: Dispatch<SetStateAction<any>>;
}

export const useUserColumns = (params: IUserColumnsParams): GridColDef[] => {
  const { isMobile, handleEditUser, setOpenDeleteModal, setSelectedUser } =
    params;
  const commonColumns: GridColDef[] = [
    { field: "index", headerName: "ID", flex: 0.5 },
    { field: "firstName", headerName: "Name", flex: 1 },
    {
      field: "actions",
      headerName: "",
      flex: 1,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false,
      renderCell: (params) => {
        const { id, row } = params;
        return (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              weight: 1,
              height: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => handleEditUser(id)}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                setOpenDeleteModal(true);
                setSelectedUser(row);
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const fullColumns: GridColDef[] = [
    ...commonColumns.slice(0, 2),
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "phoneNumber", headerName: "Phone", flex: 1 },
    ...commonColumns.slice(2),
  ];

  return isMobile ? commonColumns : fullColumns;
};
