import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import axios from "axios";

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface IExtendedUser extends IUser {
  index: number;
}

export default function UserList() {
  const [users, setUsers] = useState<IExtendedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const fetchUsers = async (page: number, pageSize: number) => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/users", {
        params: {
          _page: page + 1,
          _per_page: pageSize,
        },
      });
      const { data } = res as any;
      const { data: fetchedUsers, items } = data;
      const offset = page * pageSize;
      const userData = fetchedUsers as IUser[];

      setUsers(
        userData.map((user, index) => ({ ...user, index: offset + index + 1 }))
      );
      setRowCount(items);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "Name", flex: 1 },
    { field: "lastName", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email Address", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid<IExtendedUser>
        rows={users}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
